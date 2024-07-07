import express from "express";
import {
  deleteUser,
  dislike,
  getUser,
  like,
  saveVideo,
  subscribe,
  unsubscribe,
  update,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// update user
router.put("/:id", verifyToken, update);

// delete
router.delete("/:id", verifyToken, deleteUser);

// get user
router.get("/find/:id", getUser);

// subscribe
router.put("/sub/:id", verifyToken, subscribe);

// unsubscribe
router.put("/unsub/:id", verifyToken, unsubscribe);

// like
router.put("/like/:videoId", verifyToken, like);

// dislike
router.put("/dislike/:videoId", verifyToken, dislike);

//save video

router.put("/saveVideo/:videoId", verifyToken, saveVideo);

export default router;
