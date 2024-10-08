import { createSlice } from "@reduxjs/toolkit";

interface successState {
  success: boolean;
  title: string;
  message: string;
  onClose?: () => void;
}

const initialState: successState = {
  success: false,
  title: "",
  message: "",
};

const successSlice = createSlice({
  name: "success",
  initialState,
  reducers: {
    setSuccessStatus: (
      state,
      action: {
        type: string;
        payload: { title: string; message: string; onClose?: () => void };
      }
    ) => {
      state.success = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.onClose = action.payload.onClose;
    },
    resetSuccessStatus: (state) => {
      state.success = false;
      state.message = "";
      state.onClose = undefined;
    },
  },
});

export const { setSuccessStatus, resetSuccessStatus } = successSlice.actions;
export default successSlice.reducer;
