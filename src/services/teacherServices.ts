import axiosInstance from "config/axiosInstance";
import type {
  Teacher,
  TeacherFormData,
  DeleteTeacherFormData,
} from "types/Teacher";

const getTeachers = async (): Promise<Teacher[]> => {
  try {
    const res = await axiosInstance.get("/v1/teachers/");
    return res.data;
  } catch (e) {
    throw e;
  }
};

const getTotalTeachers = async () => {
  try {
    const res = await axiosInstance.get("/v1/teachers/count/");
    return res.data.total;
  } catch (e) {
    throw e;
  }
};

const createTeacher = async (
  teacherFormData: TeacherFormData
): Promise<Teacher> => {
  try {
    const res = await axiosInstance.post("/v1/teachers/", teacherFormData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const updateTeacher = async (
  id: number,
  teacherFormData: TeacherFormData
): Promise<Teacher> => {
  try {
    const res = await axiosInstance.patch(
      `/v1/teachers/${id}/`,
      teacherFormData
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

const deleteTeacher = async (
  id: number,
  deleteTeacherFormData: DeleteTeacherFormData
) => {
  try {
    const res = await axiosInstance.patch(
      `/v1/teachers/${id}/`,
      deleteTeacherFormData
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export {
  getTeachers,
  getTotalTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
