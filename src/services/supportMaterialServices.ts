import axios from "axios";

import {
  PARENTS_MATERIAL_URL,
  USER_MANUAL_URL,
  FAQ_URL,
} from "config/constants";
import type { FAQ, ParentsMaterial, UserManual } from "types/SupportMaterial";

const getMaterialForParents = async (): Promise<ParentsMaterial[]> => {
  try {
    const res = await axios.get(PARENTS_MATERIAL_URL);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const getUserManual = async (): Promise<UserManual[]> => {
  try {
    const res = await axios.get(USER_MANUAL_URL);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const getFaq = async (): Promise<FAQ[]> => {
  try {
    const res = await axios.get(FAQ_URL);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export { getMaterialForParents, getUserManual, getFaq };
