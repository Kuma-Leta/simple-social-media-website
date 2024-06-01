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
import { searchForPost } from "../Controllers/searchForPostController";
import { addRating } from "../Controllers/addRatingController";
import { protect } from "../middleware/authenticationMiddleware";
import { changePassword } from "../Controllers/profileController/setting/changePassword";
import { deleteUserAccount } from "../Controllers/profileController/setting/changeAccount";
import { changeName } from "../Controllers/profileController/setting/changeAccount";
import { changeEmail } from "../Controllers/profileController/setting/changeAccount";
import { resetPassword } from "../Controllers/resetPassword/resetPassword";
// import { upload } from "../middleware/uploadMiddleware";
import multer from "multer";
import path from "path";
const router = express.Router();
// const upload = multer({ dest: "uploads/" });
router.post("/signup", createUsers);
router.post("/login", loginUsers);
router.get("/getAllposts", protect, getAllPosts);

router.post(
  "/addPost",
  protect,
  upload.fields([
    { name: "imageContent", maxCount: 1 },
    { name: "videoContent", maxCount: 1 },
  ]),
  addPost
);
router.delete("/deletePost", protect, deletePost);
router.delete("/deleteAccount", protect, deleteUserAccount);
router.put("/changeName", protect, changeName);
router.put("/changeEmail", protect, changeEmail);
router.put("/changePassword", protect, changePassword);
router.put("/editPost", protect, editPost);
router.put("/addRating", protect, addRating);
router.get("/previousPosts", protect, getPreviousPost);
router.get("/searchForPost", protect, searchForPost);
router.get("/resetPassword", protect, resetPassword);

export default router;
