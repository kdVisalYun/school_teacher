import { createSlice } from "@reduxjs/toolkit";

import { getSystemInfo } from "./systemInfoAction";
import type { SystemInfo } from "types/SystemInfo";

interface systemInfoState {
  loading: boolean;
  systemInfo: SystemInfo[];
  error: string;
  success: boolean;
}

const initialState: systemInfoState = {
  loading: false,
  systemInfo: [],
  error: "",
  success: false,
};

const systemInfoSlice = createSlice({
  name: "systemInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSystemInfo.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = false;
    });
    builder.addCase(getSystemInfo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.systemInfo = payload.systemInfo;
    });
    builder.addCase(getSystemInfo.rejected, (state, { payload }) => {
      state.loading = true;
      state.error = payload || "_generic._unknown_error";
    });
  },
});

export default systemInfoSlice.reducer;
