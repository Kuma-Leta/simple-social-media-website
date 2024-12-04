import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";
const socketURL = "https://localhost:5000";
const socket = io(socketURL, { autoConnect: false });
const initialState = {
  isConnected: false,
  message: [],
};
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connectSocket(state) {
      if (!state.isConnected) {
        socket.connect();
        socket.connected = true;
      }
    },
    disconnectSocket(state) {
      if (state.isConnected) {
        socket.disconnect();
        state.isConnected = false;
      }
    },
  },
});
export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
export { socket };
