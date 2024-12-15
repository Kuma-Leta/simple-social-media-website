// import { upload } from "./../middleware/uploadMiddleware";
import { Router } from "express";
import express from "express";
import upload from "../middleware/uploadMiddleware";
import { createUsers } from "../Controllers/signupController";
import { loginUsers } from "../Controllers/loginController";
import { getAllPosts } from "../Controllers/allPostsController";
import { addPost } from "../Controllers/profileController/addPostController";
import { deletePost } from "../Controllers/profileController/deletePostController";
import { updatePost } from "../Controllers/profileController/editPostController";
import { getPreviousPost } from "../Controllers/profileController/previousPostDisplayController";
import {
  searchForPostByCategory,
  searchForPostByUserQuery,
} from "../Controllers/searchForPostController";
import { addRating } from "../Controllers/addRatingController";
import { protect } from "../middleware/authenticationMiddleware";
import { changePassword } from "../Controllers/profileController/setting/changePassword";
import { deleteUserAccount } from "../Controllers/profileController/setting/changeAccount";
import { changeName } from "../Controllers/profileController/setting/changeAccount";
import { changeEmail } from "../Controllers/profileController/setting/changeAccount";
import { resetPassword } from "../Controllers/resetPassword/resetPassword";
import catchAsync from "../globalErrorHandling/catchAsync";
import { forgotPassword } from "../Controllers/resetPassword/forgotPassword";
import { getUserRating } from "../Controllers/getUserRating";
import getSpecificPost from "../Controllers/profileController/getSpecificPost";
import getSpecificUser from "../Controllers/profileController/getSpecificUser";
import addLikeForPost from "../Controllers/likeController";
import addCommentForPost from "../Controllers/comment/commentController";
import getCommentsForAPost from "../Controllers/comment/getCommentsForAPost";
import {
  followUser,
  getFollowers,
  getFollowing,
  unfollowUser,
} from "../Controllers/followUserController";
import getAuthorPosts from "../Controllers/getAuthorPosts";
import multer from "multer";
import path from "path";
import { getChatHistory } from "../Controllers/chatWithFriendController";
const router = express.Router();
// const upload = multer({ dest: "uploads/" });
router.post("/signup", catchAsync(createUsers));
router.post("/login", catchAsync(loginUsers));
router.get("/getAllposts", protect, catchAsync(getAllPosts));

router.post(
  "/addPost",
  protect,
  upload.fields([
    { name: "imageContent", maxCount: 1 },
    { name: "videoContent", maxCount: 1 },
  ]),
  catchAsync(addPost)
);
router.delete("/deletePost/:postId", protect, catchAsync(deletePost));
router.delete("/deleteAccount", protect, catchAsync(deleteUserAccount));
router.put("/changeName", protect, catchAsync(changeName));
router.put("/changeEmail", protect, catchAsync(changeEmail));
router.put("/changePassword", protect, catchAsync(changePassword));

router.post("/addRating", protect, catchAsync(addRating));
router.get("/previousPosts", protect, catchAsync(getPreviousPost));
router.get(
  "/searchByCategory/:category",
  protect,
  catchAsync(searchForPostByCategory)
);
router.post(
  "/searchByUserQuery",
  protect,
  catchAsync(searchForPostByUserQuery)
);
router.patch("/resetPassword/:token", protect, catchAsync(resetPassword));
router.post("/forgotPassword", protect, catchAsync(forgotPassword));
router.get(
  "/getUserRating/:postId/:raterId",
  protect,
  catchAsync(getUserRating)
);
router.get("/getSpecificPost/:id", protect, catchAsync(getSpecificPost));
router.put(
  "/editPost/:id",
  upload.fields([
    { name: "imageContent", maxCount: 1 },
    { name: "videoContent", maxCount: 1 },
  ]),
  protect,
  catchAsync(updatePost)
);
router.get("/getUser/:token", protect, catchAsync(getSpecificUser));
router.post("/likePost", protect, catchAsync(addLikeForPost));
router.post("/giveComment", protect, catchAsync(addCommentForPost));
router.get("/getCommentForAPost/:postId", catchAsync(getCommentsForAPost));
router.post("/users/:id/follow", protect, catchAsync(followUser));
router.get("/getAuthorPosts/:postOwner", protect, catchAsync(getAuthorPosts));
router.get("/getHistory/:roomId", protect, catchAsync(getChatHistory));
//follow routes
router.post("/followUser", protect, catchAsync(followUser));
router.get("/getFollowers/:userId", getFollowers);
router.get("/followings/:userId", getFollowing);
router.post("/unFollow", unfollowUser);
export default router;
