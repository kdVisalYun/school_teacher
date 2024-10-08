import axiosInstance from "config/axiosInstance";
import type { TrainingPicture } from "types/TrainingPicture";

const getTrainingPictures = async (
  studentId: string
): Promise<TrainingPicture[]> => {
  try {
    const params = {
      student_id: studentId,
    };
    const res = await axiosInstance.get("/v1/training_pictures/", { params });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const uploadTrainingPicture = async (
  studentId: number,
  picture: File
): Promise<TrainingPicture> => {
  try {
    const formData = new FormData();
    formData.append("student_id", studentId.toString());
    formData.append("original_picture", picture);
    formData.append("is_usable", "true");
    const res = await axiosInstance.post("/v1/training_pictures/", formData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const updateTrainingPicture = async (
  id: number,
  isUsed: boolean
): Promise<TrainingPicture> => {
  try {
    const body = {
      is_usable: isUsed,
    };
    const res = await axiosInstance.patch(`/v1/training_pictures/${id}/`, body);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const deleteTrainingPicture = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/v1/training_pictures/${id}/`);
  } catch (e) {
    throw e;
  }
};

export {
  getTrainingPictures,
  uploadTrainingPicture,
  updateTrainingPicture,
  deleteTrainingPicture,
};
