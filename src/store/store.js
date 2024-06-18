import { configureStore } from "@reduxjs/toolkit";
import filterModalSlice from "./filterModalSlice";

const store = configureStore({
  reducer: {
    filterModal: filterModalSlice,
  },
});

export default store;
