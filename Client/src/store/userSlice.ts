import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axiosConfig";
import { RootState } from "./index";

interface userState {
  isActive: boolean;
  name: string | null;
  isLoading: string;
}
const initialState: userState = {
  isActive: false,
  name: null,
  isLoading: "loading...",
};
export const getUser = createAsyncThunk<string | null>(
  "user/getUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      // console.log(token);
      const user = await axios.get(
        `http://localhost:5000/api/getUser/${token}`
      );
      console.log(user.data.User);

      return user.data.User.name as string;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = "loading...";
        // state.error = null;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<string | null>) => {
          state.name = action.payload;
          state.isActive = true;
          state.isLoading = "succeeded";
        }
      )
      .addCase(getUser.rejected, (state) => {
        state.isLoading = "failed";
        // state.error = action.payload as string;
      });
  },
});

export const selectUsername = (state: RootState) => state.user.name;

export default userSlice.reducer;
