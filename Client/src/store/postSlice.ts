import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axiosConfig";
import { RootState } from "./index";

export interface Post {
  _id: string;
  author: string;
  textContent: string;
  imageContent?: string;
  videoContent?: string;
  rating: number;
  likes: number;
  comments: Comment[];
  user: string;
}
export interface Comment {
  user: string;
  comment: string;
  date: string;
}
interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: null | string;
}
const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: null,
};
export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/api/getAllPosts");
      console.log(response);
      return response.data.posts as Post[];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message) || "failed to fetch posts";
    }
  }
);
export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (userQuery: string, thunkAPI) => {
    try {
      const postResult = await axios.post(
        "http://localhost:5000/api/searchByUserQuery",
        { userQuery }
      );
      return postResult.data.posts as Post[];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message) || "failed to fetch posts";
    }
  }
);
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },

    //     setUserQuery(state,action:PayloadAction<Post[]>){
    // state.
    //     }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "failed to fetch posts";
      });

    builder
      .addCase(searchPosts.pending, async (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        searchPosts.fulfilled,
        async (state, action: PayloadAction<Post[]>) => {
          state.isLoading = false;
          state.posts = action.payload;
        }
      )
      .addCase(searchPosts.rejected, async (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    // builder.addCase()
  },
});
export const selectIsLoading = (state: RootState) => state.posts.isLoading;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectIsError = (state: RootState) => state.posts.error;

// export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
