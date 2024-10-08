import { createAsyncThunk } from "@reduxjs/toolkit";

import { getSystemInfo as get } from "services/systemInfoServices";
import type { SystemInfo } from "types/SystemInfo";

const getSystemInfo = createAsyncThunk<
  { systemInfo: SystemInfo[] },
  void,
  { rejectValue: string }
>("systemInfo/getSystemInfo", async (_: void, { rejectWithValue }) => {
  try {
    const systemInfo = await get();
    const now = new Date();
    const notExpiredSystemInfo = systemInfo.filter((info) => {
      const startDate = new Date(info.view_start_time);
      const endDate = new Date(info.view_end_time);
      return (
        now.getTime() >= startDate.getTime() &&
        now.getTime() <= endDate.getTime()
      );
    });
    return { systemInfo: notExpiredSystemInfo };
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

export { getSystemInfo };
