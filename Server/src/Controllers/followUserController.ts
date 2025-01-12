import { Request, Response } from "express";
import Follow from "../models/followModel";
import mongoose from "mongoose";
import { userModel } from "../models/userModel";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";

// Follow a user
// // Assuming the model name is Follow
import { getIO, onlineUsers } from "../sockets/socketConfig";

export const followUser = async (req: AuthenticatedRequest, res: Response) => {
  const { targetUserId } = req.body;
  const followerId = req.user._id;

  if (!followerId || !targetUserId) {
    return res
      .status(400)
      .json({ message: "Both userId and targetUserId are required" });
  }

  try {
    // Check if the target user exists
    const targetUser = await userModel.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    // Update the follow document for the target user
    let followDoc = await Follow.findOne({ user: targetUserId });
    if (!followDoc) {
      followDoc = await Follow.create({
        user: targetUserId,
        followings: [],
        followers: [followerId],
      });
    } else {
      if (!followDoc.followers.includes(followerId)) {
        followDoc.followers.push(followerId);
        await followDoc.save();
      }
    }

    // Update the follow document for the follower
    let targetFollowDoc = await Follow.findOne({ user: followerId });
    if (!targetFollowDoc) {
      targetFollowDoc = await Follow.create({
        user: followerId,
        followings: [targetUserId],
        followers: [],
      });
    } else {
      if (!targetFollowDoc.followings.includes(targetUserId)) {
        targetFollowDoc.followings.push(targetUserId);
        await targetFollowDoc.save();
      }
    }

    // Prepare notification data
    const io = getIO();
    const notificationData = {
      notificationReceiverId: targetUserId,
      notificationReceiver: `${targetUser.firstName} ${targetUser.lastName}`, // Replace with actual field names
      reactor: `${req.user.firstName} ${req.user.lastName}`,
      reactorId: followerId,
      notificationType: "follow",
      message: `${req.user.firstName} ${req.user.lastName} started following you.`,
      isRead: false,
    };

    // Send real-time notification if the user is online
    if (onlineUsers.has(targetUserId)) {
      const socketId = onlineUsers.get(targetUserId);
      io.to(socketId).emit("notification", notificationData);
    }

    // Optionally save the notification to the database for offline users
    // await NotificationModel.create(notificationData);

    res
      .status(200)
      .json({ message: "Followed successfully", followDoc, targetFollowDoc });
  } catch (error) {
    res.status(500).json({ message: "Error following user", error });
  }
};

// Unfollow a user
export const unfollowUser = async (req: Request, res: Response) => {
  const { userId, targetUserId } = req.body;

  if (!userId || !targetUserId) {
    return res
      .status(400)
      .json({ message: "Both userId and targetUserId are required" });
  }

  try {
    // Update the follow document
    const followDoc = await Follow.findOne({ user: userId });
    if (followDoc && followDoc.followings.includes(targetUserId)) {
      followDoc.followings = followDoc.followings.filter(
        (id) => id.toString() !== targetUserId
      );
      await followDoc.save();
    }

    // Update the target user's followers
    const targetFollowDoc = await Follow.findOne({ user: targetUserId });
    if (targetFollowDoc && targetFollowDoc.followers.includes(userId)) {
      targetFollowDoc.followers = targetFollowDoc.followers.filter(
        (id) => id.toString() !== userId
      );
      await targetFollowDoc.save();
    }

    res
      .status(200)
      .json({ message: "Unfollowed successfully", targetFollowDoc, followDoc });
  } catch (error) {
    res.status(500).json({ message: "Error unfollowing user", error });
  }
};

// Get followers of a user
export const getFollowers = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const followDoc = await Follow.findOne({ user: userId }).populate(
      "followers"
    );
    if (!followDoc) {
      return res
        .status(404)
        .json({ message: "User not found or has no followers" });
    }

    res.status(200).json({ followers: followDoc.followers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching followers", error });
  }
};

// Get following of a user
export const getFollowing = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const followDoc = await Follow.findOne({ user: userId }).populate(
      "followings"
    );
    if (!followDoc) {
      return res
        .status(404)
        .json({ message: "User not found or is not following anyone" });
    }

    res.status(200).json({ followings: followDoc.followings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching following", error });
  }
};
