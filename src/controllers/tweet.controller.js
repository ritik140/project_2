import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Tweet } from "../models/tweets.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const setTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "content could not be empty");
  }
  const user = await User.findById(req.user?._id);
  console.log(user);
  if (!user) {
    throw new ApiError(400, "User is not authorized");
  }
  const tweet = await Tweet.create({
    content,
    owner: user,
  });

  const tweetset = await Tweet.findById(tweet._id);

  if (!tweetset) {
    throw new ApiError(400, "Not abel to Set the Tweet");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, tweetset, "Tweet has been set successfully"));
});
const getTweet = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) {
    throw new ApiError(400, "username is Empty");
  }
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(400, "Unathroized access");
  }

  const channel = await Tweet.aggregate([
    {
      $match: {
        owner: user?._id,
      },
    },
    {
      $project: {
        content: 1,
      },
    },
  ]);
  if (!channel?.length) {
    throw new ApiError(400, "Channel does not Exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, channel, "Fetch all Tweets Successfully"));
});
const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const { newContent } = req.body;
  if (!tweetId) {
    throw new ApiError(400, "Tweet_id is not present");
  }
  const tweet = await Tweet.findByIdAndUpdate(tweetId, {
    $set: {
      content: newContent,
    },
  });
  if (!tweet) {
    throw new ApiError(400, "No Tweet Found");
  }
  const newTweet = await Tweet.findById(tweetId).select("-owner");
  if (!newTweet) {
    throw new ApiError(400, "Tweet not Updated Succesfully");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newTweet, "Tweet Update Successfully"));
});
const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!tweetId) {
    throw new ApiError(400, "Tweet_id is not present");
  }
  const tweet = await Tweet.findByIdAndDelete(tweetId).select("-owner");

  if (!tweet) {
    throw new ApiError(400, "Tweet Not able to delete");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Tweet Deleted Successfully"));
});

export { setTweet, getTweet, updateTweet, deleteTweet };
