import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axiosConfig";
import { RootState } from "./index";

interface userState {
  isActive: boolean;
  user: {
    firstName: string;
    lastName: string;
    _id: string;
  };
  isLoading: string;
}
const initialState: userState = {
  isActive: false,
  user: {
    firstName: "",
    lastName: "",
    _id: "",
  },
  isLoading: "loading...",
};
export const getUser = createAsyncThunk<{
  firstName: string;
  lastName: string;
  _id: string;
} | null>("user/getUser", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("authToken");
    // console.log(token);
    const user = await axios.get(`http://localhost:5000/api/getUser/${token}`);
    const userData = {
      firstName: user.data.User.firstName,
      lastName: user.data.User.lastName,
      _id: user.data.User._id,
    };

    return userData;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
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
        (
          state,
          action: PayloadAction<{
            firstName: string;
            lastName: string;
            _id: string;
          } | null>
        ) => {
          if (action.payload) {
            state.user = action.payload;
            state.isLoading = "succeeded";
            state.isActive = true;
          }
        }
      )
      .addCase(getUser.rejected, (state) => {
        state.isLoading = "failed";
        // state.error = action.payload as string;
      });
  },
});

export const selectUsername = (state: RootState) => state.user.user;

export default userSlice.reducer;
