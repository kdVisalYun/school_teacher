import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import i18n from "i18n";
import {
  login as handleLogin,
  refreshAccessToken,
  logout as handleLogout,
} from "services/authServices";
import { REFRESH_TOKEN_LOCAL_STORAGE } from "config/keywords";
import { LOGIN_PATH } from "router/pathName";
import { getCurrentLanguage } from "utilities/CurrentLanguageGetter";

const login = createAsyncThunk<
  { token: string },
  { loginKey: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ loginKey, password }, { rejectWithValue }) => {
  try {
    const authToken = await handleLogin(
      loginKey,
      password,
      getCurrentLanguage()
    );
    localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE, authToken.refresh);
    return { token: authToken.access };
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      const errorMessage = e.response?.data.detail;
      return rejectWithValue(errorMessage || "_generic._unknown_error");
    } else {
      return rejectWithValue(e.message);
    }
  }
});

const refreshToken = createAsyncThunk<
  { token: string },
  void,
  { rejectValue: string }
>("auth/refreshToken", async (_: void, { rejectWithValue }) => {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE);
    const newAuthToken = await refreshAccessToken(refreshToken || "");
    localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE, newAuthToken.refresh);
    return { token: newAuthToken.access };
  } catch (e) {
    localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE);
    window.location.replace(LOGIN_PATH);
    return rejectWithValue("_generic._unknown_error");
  }
});

const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_: void, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE);
      if (refreshToken) {
        await handleLogout(refreshToken || "");
        localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE);
      } else {
        throw new Error();
      }
    } catch (e) {
      return rejectWithValue("_generic._unknown_error");
    }
  }
);

export { login, refreshToken, logout };
