import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
} from "../controllers/video.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwt);
router.route("/publish").post(
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);
router
  .route("/:videoId")
  .get(getVideoById)
  .patch(upload.single("thumbnail"), updateVideo)
  .delete(deleteVideo);
router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router;
