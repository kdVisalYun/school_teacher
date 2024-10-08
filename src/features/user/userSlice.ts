import { createSlice } from "@reduxjs/toolkit";

import { getUserProfile } from "./userAction";
import type { User } from "types/User";

interface userState {
  loading: boolean;
  user: User | null;
  error: string;
  success: boolean;
}

const initialState: userState = {
  loading: false,
  user: null,
  error: "",
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: { type: string; payload: { user: User } }) => {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = false;
      state.user = null;
    });
    builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = payload.user;
    });
    builder.addCase(getUserProfile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || "_generic._unknown_error";
    });
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
