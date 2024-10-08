import axios from "axios";

import { API_BASE_URL } from "config/constants";
import { SupportedLang } from "config/constants";
import axiosInstance from "config/axiosInstance";

interface AuthToken {
  access: string;
  refresh: string;
}

const login = async (
  loginKey: string,
  password: string,
  lang: SupportedLang
): Promise<AuthToken> => {
  try {
    const body = {
      login_key: loginKey,
      password,
    };
    const res = await axios.post(`${API_BASE_URL}/v1/token`, body, {
      headers: { "Accept-Language": lang },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const refreshAccessToken = async (refreshToken: string): Promise<AuthToken> => {
  try {
    const body = {
      refresh: refreshToken,
    };
    const res = await axios.post(`${API_BASE_URL}/v1/token/refresh`, body);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const logout = async (refreshToken: string): Promise<void> => {
  try {
    const body = {
      refresh: refreshToken,
    };
    const res = await axiosInstance.post("/v1/logout", body);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export { login, refreshAccessToken, logout };
