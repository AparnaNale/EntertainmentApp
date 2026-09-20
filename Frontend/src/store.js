import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "../redux/slice/BookmarkSlice";

export const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
  },
});
