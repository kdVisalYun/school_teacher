import axiosInstance from "config/axiosInstance";
import type { User, ChangePasswordFormData } from "types/User";
import type { PrincipalFormInfo } from "types/Facility";
import { SupportedLang } from "config/constants";

const getUser = async (): Promise<User> => {
  try {
    const res = await axiosInstance.get("/v1/profile/");
    return res.data;
  } catch (e) {
    throw e;
  }
};

const updateUser = async (formData: PrincipalFormInfo): Promise<User> => {
  try {
    const res = await axiosInstance.patch("/v1/update_profile/", formData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const changePassword = async (
  formData: ChangePasswordFormData,
  lang: SupportedLang
): Promise<void> => {
  try {
    const res = await axiosInstance.post("/v1/change_password/", formData, {
      headers: { "Accept-Language": lang },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

export { getUser, updateUser, changePassword };
