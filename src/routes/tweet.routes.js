import { Router } from "express";
const router = Router();
import {
  setTweet,
  getTweet,
  deleteTweet,
  updateTweet,
} from "../controllers/tweet.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

router.route("/set-tweet").post(verifyJwt, setTweet);
router.route("/user/:username").get(verifyJwt, getTweet);
router
  .route("/:tweetId")
  .patch(verifyJwt, updateTweet)
  .delete(verifyJwt, deleteTweet);
export default router;
