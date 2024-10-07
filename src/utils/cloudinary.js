import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //File System (it helps in read write the file)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    //Upload the file in cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(response);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //To remove from the save local file when the operation get failed
    console.log("ERROR WHILE UPLOADING", error);
  }
};

export { uploadOnCloudinary };

// // Upload an image
// const uploadResult = await cloudinary.uploader
//   .upload(
//     "IMAGE_URL",
//     {
//       public_id: "shoes",
//     }
//   )
//   .catch((error) => {
//     console.log(error);
//   });

// console.log(uploadResult);
