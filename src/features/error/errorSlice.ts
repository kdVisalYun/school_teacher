import { createSlice } from "@reduxjs/toolkit";

interface errorState {
  error: boolean;
  message: string;
}

const initialState: errorState = {
  error: false,
  message: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setErrorStatus: (state, action: { type: string; payload: string }) => {
      state.error = true;
      state.message = action.payload;
    },
    resetErrorStatus: (state) => {
      state.error = false;
      state.message = "";
    },
  },
});

export const { setErrorStatus, resetErrorStatus } = errorSlice.actions;
export default errorSlice.reducer;
