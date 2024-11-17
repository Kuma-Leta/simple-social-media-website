import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axiosConfig";
import { RootState } from "./index";
interface Comment {
  postId: string;
  comment: string;
}
interface CommentState {
  isSending: boolean;
  comments: Comment[];
  comment: Comment;
  isError: string;
}
const initialState: CommentState = {
  comments: [],
  isSending: false,
  comment: {
    postId: "",
    comment: "",
  },
  isError: "",
};
export const AddComment = createAsyncThunk(
  "comment/addComment",
  async (comment: Comment, thunkApi) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/giveComment",
        comment
      );
      console.log(result);
    } catch (error) {
      thunkApi.rejectWithValue("error while adding comment");
    }
  }
);
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComment(state, action: PayloadAction<string>) {
      state.comment.comment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddComment.pending, (state) => {
        state.isSending = true;
      })
      .addCase(
        AddComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.isSending = false;
          state.comments.push(action.payload);
        }
      )
      .addCase(AddComment.rejected, (state) => {
        state.isError = "error while commenting ";
        state.isSending = false;
      });
  },
});
export const newComment = (state: RootState) => state.comment.comment;
export const selectIsSending = (state: RootState) => state.comment.isSending;
export const selectError = (state: RootState) => state.comment.isError;
export const setComment = commentSlice.actions;
export default commentSlice.reducer;
