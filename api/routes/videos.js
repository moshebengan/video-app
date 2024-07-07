import express from 'express';
import { addVideo, addView, deleteVideo, getByTag, getVideo, getVideoByUserId, increaseVideoViews, random, search, sub, trend, updateVideo } from "../controllers/video.js"
import { verifyToken } from '../verifyToken.js';


const router = express.Router()

//create video
router.post("/", verifyToken, addVideo)

//update video
router.put("/:id", verifyToken, updateVideo)
//delete video
router.delete("/:id", verifyToken, deleteVideo)
//get specific video
router.get("/find/:id", getVideo)
//increase view by 1
router.put("/view/:id", addView)

//get videos by number of watchers
router.get("/trend",trend)
//get random videos
router.get("/random", random)

router.get("/library")
//get videos from channels the user is subscribed to
router.get("/sub",verifyToken, sub)
//get videos by tag
router.get("/tags", getByTag)
//get videos by Query
router.get("/search", search)
//get videos by userId
router.get("/:userId", getVideoByUserId)
//increase view by 1
router.put("/views/:videoId", increaseVideoViews);



export default router;