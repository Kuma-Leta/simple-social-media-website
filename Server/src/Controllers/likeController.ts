import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import { postModel } from "../models/postModel";
import { likeModel } from "../models/likeModel";
import { getIO, onlineUsers } from "../sockets/socketConfig";
import { userModel } from "../models/userModel";
const io = getIO();
import notificationModel from "../models/notificationModel";
import { Server } from "socket.io";
const addLikeForPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user);
  const { postId } = req.body;
  const post = await postModel.findById(postId);
  const postOwner = await userModel.findById(post?.user);
  const like = await likeModel.findOne({ postId, user: req.user });
  if (like) {
    await likeModel.findOneAndDelete({ postId, user: req.user });
    await postModel.findByIdAndUpdate(
      postId,
      { $inc: { likes: -1 } },
      { new: true }
    );
  } else {
    await likeModel.create({ postId, user: req.user });
    await postModel.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (post?.user.toString() !== req.user._id.toString()) {
      const notificationData = {
        notificationReceiver: postOwner?.firstName,
        notificationReceiverId: post?.user,
        reactor: req.user.firstName + " " + req.user.lastName, // Assuming user has a `name` field
        reactorId: req.user._id,
        notificationType: "like",
        message: `${req.user.firstName} liked your post.`,
        metaData: { postId },
      };
      if (onlineUsers.has(post?.user.toString())) {
        // User is online, send real-time notification
        const socketId = onlineUsers.get(post?.user.toString());
        io.to(socketId).emit("notification", notificationData);
      }

      // Save notification to the database
      await notificationModel.create(notificationData);
    }
  }

  res.status(200).json({ status: "success", post });
};
export default addLikeForPost;
