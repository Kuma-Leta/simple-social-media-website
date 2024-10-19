import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "./postSlice";
import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
