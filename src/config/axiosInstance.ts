import axios from "axios";
import type { Store } from "@reduxjs/toolkit";

import { API_BASE_URL } from "./constants";
import { refreshToken } from "features/auth/authAction";
import { AppDispatch } from "store";
import { LOGIN_PATH } from "router/pathName";

let store: Store;
let dispatch: AppDispatch;
export const injectStore = (_store: Store) => {
  store = _store;
  dispatch = _store.dispatch;
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url?.includes("v1/pictures/")) {
      config.timeout = 180000;
    }

    const accessToken = store.getState().auth.token;
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(new Error(error))
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (originalRequest)
        try {
          originalRequest._retry = true;
          await dispatch(refreshToken());
          return axiosInstance(originalRequest);
        } catch (e) {
          window.location.replace(LOGIN_PATH);
        }
    } else {
      return Promise.reject(new Error(error));
    }
  }
);

export default axiosInstance;
