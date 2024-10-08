import axiosInstance from "config/axiosInstance";

import store from "store";
import { PictureStudentOption, PicturePublishStatus } from "config/constants";
import type {
  SummarizationByDate,
  SummarizationByClass,
  SummaryStudentPicture,
} from "types/Summarization";

const getPublishedPictureSummarizationByDate = async (
  startDate: string,
  endDate: string
): Promise<SummarizationByDate[]> => {
  try {
    const params = {
      from: startDate,
      to: endDate,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    const res = await axiosInstance.get("/v1/summarize_picture_by_date/", {
      params,
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

type ClassSummarizationParam = {
  from: string;
  to: string;
  class_id: number | undefined;
  is_favorite: boolean | undefined;
  timezone: string;
  picture_type__in?: string;
  studentpicture__student_id?: number;
};

const getPublishedPictureSummarizationByClass = async (): Promise<
  SummarizationByClass[]
> => {
  try {
    const { startDate, endDate, classId, studentId, isFavorite } =
      store.getState().pictureSearch;
    const params: ClassSummarizationParam = {
      from: startDate,
      to: endDate,
      class_id: classId || undefined,
      is_favorite: isFavorite || undefined,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    switch (studentId) {
      case PictureStudentOption.all:
        params.picture_type__in = "1,3";
        break;
      case PictureStudentOption.class:
        params.picture_type__in = "2";
        break;
      case null:
        break;
      default:
        params.picture_type__in = "1,3";
        params.studentpicture__student_id = studentId;
        break;
    }
    const res = await axiosInstance.get("/v1/summarize_picture_by_class/", {
      params,
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const getPublishedPictureSummarizationByStudents = async (
  classId: number,
  startDate: string,
  endDate: string
): Promise<{ total: SummaryStudentPicture[] }> => {
  try {
    const params = {
      create_time__gte: startDate,
      create_time__lte: endDate,
      picture_id__class_id: classId,
      picture_id__public_status: PicturePublishStatus.published,
    };
    const res = await axiosInstance.get(
      "/v1/student_pictures/summarize_by_student/",
      {
        params,
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export {
  getPublishedPictureSummarizationByDate,
  getPublishedPictureSummarizationByClass,
  getPublishedPictureSummarizationByStudents,
};
