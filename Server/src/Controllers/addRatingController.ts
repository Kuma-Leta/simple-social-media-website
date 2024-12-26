import { NextFunction, Request, Response } from "express";
import { ratingModel } from "../models/ratingModel";
import AppError from "../globalErrorHandling/appError";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import { userModel } from "../models/userModel";
import { postModel } from "../models/postModel";
import { getIO, onlineUsers } from "../sockets/socketConfig";
import notificationModel from "../models/notificationModel";
export const addRating = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { postId, amount } = req.body;
  const rater = req.user;

  // Ensure the rater exists
  const postRater = await userModel.findById(rater._id);
  if (!postRater) {
    return next(new AppError("No user found", 400));
  }

  // Ensure the post exists
  const post = await postModel.findById(postId);
  if (!post) {
    return next(new AppError("No post found", 400));
  }

  // Prevent self-rating
  if (post.user.toString() === rater._id.toString()) {
    return next(new AppError("You can't rate your own post", 400));
  }

  // Check if the post is already rated by the user
  const alreadyRated = await ratingModel.findOne({
    postId,
    raterId: rater._id,
  });
  if (alreadyRated) {
    await ratingModel.findByIdAndUpdate(
      alreadyRated._id,
      { amount },
      { new: true }
    );
  } else {
    await ratingModel.create({ postId, raterId: rater._id, amount });
  }

  // Recalculate the post's average rating
  const allRatingsForThePost = await ratingModel.find({ postId });
  if (!allRatingsForThePost || allRatingsForThePost.length === 0) {
    return next(new AppError("Failed to retrieve ratings", 400));
  }

  const totalRating = allRatingsForThePost.reduce(
    (acc, rating) => acc + rating.amount,
    0
  );
  const updatedRating = Number(
    (totalRating / allRatingsForThePost.length).toFixed(1)
  );

  // Update the post's rating
  await postModel.findByIdAndUpdate(
    postId,
    { rating: updatedRating },
    { new: true }
  );
  const postOwner = await userModel.findById(post.user);
  // Send notification to post owner
  const receiverId = post.user.toString();
  const notificationData = {
    notificationReceiverId: receiverId,
    notificationReceiver: postOwner?.firstName, // Replace with the actual field for the username
    reactor: `${rater.firstName} ${rater.lastName}`,
    reactorId: rater._id,
    notificationType: "rating",
    message: `${rater.firstName} ${rater.lastName} rated your post.`,
    isRead: false,
  };

  const io = getIO();

  if (onlineUsers.has(receiverId)) {
    // User is online, send real-time notification
    const socketId = onlineUsers.get(receiverId);
    io.to(socketId).emit("notification", notificationData);
  }

  // Save the notification to the database (optional if using persistent notifications)
  await notificationModel.create(notificationData);

  res.status(200).json({ status: "success", updatedRating });
};
