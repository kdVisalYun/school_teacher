import axiosInstance from "config/axiosInstance";
import { StudentSortValue } from "config/constants";
import type {
  Student,
  StudentClass,
  StudentFormData,
  UpdateClassFormData,
} from "types/Student";

const getStudents = async (
  classId: number,
  sortValue: StudentSortValue | undefined
): Promise<Student[]> => {
  try {
    const params = {
      class_id: classId,
      order_by: sortValue || "",
    };
    const res = await axiosInstance.get("/v1/students/", { params });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const getStudentsForDropdown = async (
  classId: number
): Promise<StudentClass[]> => {
  try {
    const params = {
      class_id: classId,
    };
    const res = await axiosInstance.get("/v1/student_class/", { params });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const createStudent = async (
  studentFormData: StudentFormData
): Promise<Student> => {
  try {
    const res = await axiosInstance.post("/v1/students/", studentFormData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const updateStudent = async (
  id: number,
  studentFormData: StudentFormData
): Promise<Student> => {
  try {
    const res = await axiosInstance.patch(
      `/v1/students/${id}/`,
      studentFormData
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

const updateClass = async (formData: UpdateClassFormData) => {
  try {
    await axiosInstance.post("/v1/students/upgrade_class/", formData);
  } catch (e) {
    throw e;
  }
};

const changeProfilePicture = async (
  id: number,
  picture: string
): Promise<Student> => {
  try {
    const body = {
      profile_picture_for_admin: picture,
    };
    const res = await axiosInstance.patch(`/v1/students/${id}/`, body);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const deleteStudent = async (studentId: number) => {
  try {
    await axiosInstance.delete(`/v1/students/${studentId}/`);
  } catch (e) {
    throw e;
  }
};

export {
  getStudents,
  getStudentsForDropdown,
  createStudent,
  updateStudent,
  updateClass,
  changeProfilePicture,
  deleteStudent,
};
