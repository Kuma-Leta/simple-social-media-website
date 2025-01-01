import { Comment, commentModel } from "../../models/commentModel";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { postModel } from "../../models/postModel";
import { onlineUsers, getIO } from "../../sockets/socketConfig";
import notificationModel from "../../models/notificationModel";
import { userModel } from "../../models/userModel";
const addCommentForPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { comment, postId } = req.body;
    const commentor = req.user.firstName + " " + req.user.lastName;
    console.log(req.user);
    // Create and save comment
    const newComment = {
      comment: comment,
      postId: postId,
      user: req.user._id,
      commentor: commentor,
      date: new Date(),
    };

    const post = await postModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ status: "error", message: "Post not found" });
    }

    const savedComment = await commentModel.create(newComment);
    post?.comments?.push(savedComment.id);
    await post.save();

    const populatedPost = await postModel
      .findById(postId)
      .populate("comments")
      .exec();
    const postOwner = await userModel.findById(post.user);
    // Prepare notification
    const notificationData = {
      notificationReceiverId: post.user.toString(),
      notificationReceiver: postOwner?.firstName,
      reactor: commentor,
      reactorId: req.user._id,
      notificationType: "comment",
      message: `${commentor} commented on your post!`,
    };

    // Check if the post owner is online
    const io = getIO();
    const receiverId = post.user.toString();

    if (onlineUsers.has(receiverId)) {
      // User is online, send real-time notification
      const socketId = onlineUsers.get(receiverId);
      io.to(socketId).emit("notification", notificationData);
    }

    // Save notification to the database
    await notificationModel.create(notificationData);

    res.status(200).json({
      status: "success",
      populatedPost,
      savedComment,
    });
  } catch (error) {
    next(error); // Pass any errors to the global error handler
  }
};

export default addCommentForPost;
