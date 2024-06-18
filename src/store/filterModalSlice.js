import { createSlice } from "@reduxjs/toolkit";

const filterModalSlice = createSlice({
  name: "filterModal",
  initialState: {
    isModalOpen: false,
  },
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const { toggleModal } = filterModalSlice.actions;

export default filterModalSlice.reducer;
