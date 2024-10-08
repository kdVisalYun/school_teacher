import { createSlice } from "@reduxjs/toolkit";

import { login, refreshToken, logout } from "./authAction";
import { LOGIN_PATH } from "router/pathName";

interface authState {
  loading: boolean;
  token: string;
  error: string;
  success: boolean;
}

const initialState: authState = {
  loading: false,
  token: "",
  error: "",
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = false;
      state.token = "";
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.token = payload.token;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || "_generic._unknown_error";
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.token = "";
    });
    builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
      state.token = payload.token;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = "";
      window.location.replace(LOGIN_PATH);
    });
  },
});

export default authSlice.reducer;
