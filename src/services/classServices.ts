import axiosInstance from "config/axiosInstance";
import { ClassSortValue } from "config/constants";
import type { Class, ClassFormData } from "types/Class";
import store from "store";

const getClasses = async (): Promise<Class[]> => {
  try {
    const params = {
      order_by: ClassSortValue.name_asc,
    };
    const res = await axiosInstance.get("/v1/classes/", { params });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const getClassesFromAcademicYear = async (year: number): Promise<Class[]> => {
  try {
    const { sortBy } = store.getState().class;
    const params = {
      year,
      order_by: sortBy,
    };
    const res = await axiosInstance.get("/v1/classes/", { params });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const createClass = async (formData: ClassFormData): Promise<Class> => {
  try {
    const res = await axiosInstance.post("/v1/classes/", formData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const updateClass = async (
  id: number,
  formData: ClassFormData
): Promise<Class> => {
  try {
    const res = await axiosInstance.patch(`/v1/classes/${id}/`, formData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const deleteClass = async (id: number) => {
  try {
    await axiosInstance.delete(`/v1/classes/${id}/`);
  } catch (e) {
    throw e;
  }
};

export {
  getClasses,
  getClassesFromAcademicYear,
  createClass,
  updateClass,
  deleteClass,
};
