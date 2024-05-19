import { Router } from "express";
import { createUsers } from "../Controllers/signupController";
import { loginUsers } from "../Controllers/loginController";
import { getAllPosts } from "../Controllers/allPostsController";
import { addPost } from "../Controllers/profileController/addPostController";
import { deletePost } from "../Controllers/profileController/deletePostController";
import { editPost } from "../Controllers/profileController/editPostController";
import { getPreviousPost } from "../Controllers/profileController/previousPostDisplayController";
import { searchForPost } from "../Controllers/searchForPostController";
import { addRating } from "../Controllers/addRatingController";
const router = Router();
router.post("/signup", createUsers);
router.post("/login", loginUsers);
router.get("/getAllposts", getAllPosts);
router.post("/addPosts", addPost);
router.delete("/deletePost", deletePost);
router.put("/editPost", editPost);
router.put("/addRating", addRating);
router.get("/previousPosts", getPreviousPost);
router.get("/searchForPost", searchForPost);

export default router;
