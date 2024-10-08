import axiosInstance from "config/axiosInstance";
import type { SystemInfo } from "types/SystemInfo";

const getSystemInfo = async (): Promise<SystemInfo[]> => {
  try {
    const response = await axiosInstance.get("/v1/system_informations/");
    return response.data;
  } catch (e) {
    throw e;
  }
};

export { getSystemInfo };
