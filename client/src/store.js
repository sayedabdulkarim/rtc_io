import { configureStore } from "@reduxjs/toolkit";
//reducers
import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/auth/authSlice";
import alertReducer from "./slices/alert/alertSlice";
import friendReducer from "./slices/friend/friendSlice";
import chatReducer from "./slices/chat/chatSlice";
import roomReducer from "./slices/room/roomSlice";

const store = configureStore({
  reducer: {
    authReducer,
    alertReducer,
    friendReducer,
    chatReducer,
    roomReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
  ],
  //on production change it to false
  devTools: process.env.NODE_ENV === "development",
});

export default store;
