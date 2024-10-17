import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
  /*
    <TODO--------->
    1. Get the title and description from the body.
    2. We have to get the video from the body
    3. Try to Upload the video on cloudnary
    4. Take out the url from the cloudinary
    5. Take out the user also and neccassary data which is required
    6. Set the data in the MongoDb
    7. Return the result
    </TODO--------->
    */
  const { title, description, pub } = req.body;

  if (!title && !description) {
    throw new ApiError(400, "The Title and Description is Required!!");
  }
  //   console.log(req.files);

  const videoLocalPath = req.files?.videoFile[0].path;
  const thumbnailLocalPath = req.files?.thumbnail[0].path;
  const user = await User.findById(req.user?._id);
  // console.log(user);

  if (!videoLocalPath) {
    throw new ApiError(400, "Something went wrong wile Publishing a video");
  }

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Something while wrong on publishing thumbnail");
  }
  const video = await uploadOnCloudinary(videoLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!video && !thumbnail) {
    throw new ApiError(
      400,
      "Something went wrong while Uploading a video or Thumbnail"
    );
  }

  const PublishVideo = await Video.create({
    title,
    description,
    pub,
    videoFile: video?.url,
    duration: video?.duration,
    thumbnail: thumbnail?.url,
    owner: user,
  });
  if (!PublishVideo) {
    throw new ApiError(
      400,
      "Something went wrong in publishing the Video in MongoDB"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, PublishVideo, "Video Publish Successfully"));

  // TODO: get video, upload to cloudinary, create video
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(400, "Video Not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetch successfully"));
  //TODO: get video by id
});

const updateVideo = asyncHandler(async (req, res) => {
  //TODO: update video details like title, description, thumbnail
  const { videoId } = req.params;
  const { title, description } = req.body;

  if (!videoId) {
    throw new ApiError(400, "VideoId is not present");
  }
  if (!(title || description)) {
    throw new ApiError(400, "Required Field");
  }
  //   console.log(req.file);
  const thumbnailLocalPath = req.file?.path;
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is not present");
  }
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!thumbnail) {
    throw new ApiError(400, "Thumbnail not upload Successfully");
  }

  const video = await Video.findByIdAndUpdate(videoId, {
    $set: {
      title,
      description,
      thumbnail: thumbnail.url,
    },
  }).select("-owner -duration");

  if (!videoId) {
    throw new ApiError(400, "Video not able to uploaded");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video details Update Successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(400, "The Video Id is not present");
  }
  const video = await Video.findByIdAndDelete(videoId);
  if (!video) {
    throw new ApiError(400, "Problem while deleting the video");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "The video is deleted successfully"));
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError(400, "The Video Id is not present");
  }
  const getVideo = await Video.findById(videoId);
  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        public: !getVideo?.public,
      },
    },
    { returnDocument: "after" }
  );

  if (!video) {
    throw new ApiError(400, "Problem while changing the status of video");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, video, "Publish Status Change"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
