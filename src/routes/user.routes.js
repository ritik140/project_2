import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  resetPassword,
  getCurrentUser,
  updateAccountDetails,
  fileUploadAvatar,
  fileUploadCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  //Middleware of Multer
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refreshToken").post(refreshAccessToken);
router.route("/change-password").post(verifyJwt, resetPassword);
router.route("/current-user").post(verifyJwt, getCurrentUser);
router.route("/update-account").patch(verifyJwt, updateAccountDetails);
router
  .route("/avatar-update")
  .patch(verifyJwt, upload.single("/avatar"), fileUploadAvatar);
router
  .route("/cover-image-update")
  .patch(verifyJwt, upload.single("/coverImage"), fileUploadCoverImage);

router.route("/c/:username").get(verifyJwt, getUserChannelProfile);

router.route("/history").get(verifyJwt, getWatchHistory);

export default router;
