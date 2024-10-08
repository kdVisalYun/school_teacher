import { createAsyncThunk } from "@reduxjs/toolkit";

import { getUser } from "services/userServices";
import type { User } from "types/User";
import { PRINCIPAL, TEACHER } from "config/keywords";

const getUserProfile = createAsyncThunk<
  { user: User },
  void,
  { rejectValue: string }
>("user/getUserProfile", async (_: void, { rejectWithValue }) => {
  try {
    const user = await getUser();
    if (user.role !== PRINCIPAL && user.role !== TEACHER)
      throw new Error("_login._permission_denies");
    return { user };
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

export { getUserProfile };
