import { createError } from '../err.js'
import Comment from '../models/Comment.js'
import Video from '../models/Video.js'

export const addComment = async (req, res, next) => {
    const newComment = new Comment({...req.body, userId: req.user.id})
    try {
       const savedComment = await newComment.save()
       res.status(200).json(savedComment);
    } catch (err) {
        next(err)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) {
            next(createError(404, "Comment not exist"))
        }
        const video = await Video.findById(comment.videoId)
        // in case video not exists anymore
        if (!video) {
            next(createError(404, "Video not exist"))
        }

        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("The comment has been deleted.")
        } else {
            next(createError(403, "You can delete only your comment"))
        }
        
    } catch (err) {
        next(err)
    }
}

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({videoId: req.params.videoId})
        res.status(200).json(comments)
    } catch (err) {
        next(err)
    }
}