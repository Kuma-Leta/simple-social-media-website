// import { upload } from "./../middleware/uploadMiddleware";
import { Router } from "express";
import express from "express";
import upload from "../middleware/uploadMiddleware";
import { createUsers } from "../Controllers/signupController";
import { loginUsers } from "../Controllers/loginController";
import { getAllPosts } from "../Controllers/allPostsController";
import { addPost } from "../Controllers/profileController/addPostController";
import { deletePost } from "../Controllers/profileController/deletePostController";
import { editPost } from "../Controllers/profileController/editPostController";
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
// import { upload } from "../middleware/uploadMiddleware";
import multer from "multer";
import path from "path";
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
router.delete("/deletePost", protect, catchAsync(deletePost));
router.delete("/deleteAccount", protect, catchAsync(deleteUserAccount));
router.put("/changeName", protect, catchAsync(changeName));
router.put("/changeEmail", protect, catchAsync(changeEmail));
router.put("/changePassword", protect, catchAsync(changePassword));
router.put("/editPost", protect, catchAsync(editPost));
router.post("/addRating", protect, catchAsync(addRating));
router.get("/previousPosts", protect, catchAsync(getPreviousPost));
router.post("/searchByCategory", protect, searchForPostByCategory);
router.post(
  "/searchByUserQuery",
  protect,
  catchAsync(searchForPostByUserQuery)
);
router.get("/resetPassword", protect, catchAsync(resetPassword));

export default router;
