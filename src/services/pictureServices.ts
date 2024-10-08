import axiosInstance from "config/axiosInstance";

import store from "store";
import type {
  RandomPicture,
  Picture,
  PublishedPictureResponse,
  UploadPictureFormData,
  PublishPictureFormData,
  UpdatePublishStatusFormData,
  UpdatePictureTypeFormData,
  UpdateIsFavoriteFormData,
  PictureGroupByStudent,
} from "types/Pictures";
import type { AddTagStudentFormData, TagStudent } from "types/TagStudent";
import type { ActivityTag, RecentActivityTagResponse } from "types/ActivityTag";
import {
  SupportedLang,
  PictureStudentOption,
  PICTURE_PAGE_SIZE,
} from "config/constants";

const getRandomPictures = async (
  numberOfPictures: number,
  lang: SupportedLang
): Promise<RandomPicture[]> => {
  try {
    const params = {
      number: numberOfPictures,
    };
    const res = await axiosInstance.get("/v1/random_pictures/", {
      params,
      headers: { "Accept-Language": lang },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

type PublishedPictureParam = {
  public_status: number;
  is_favorite: boolean | undefined;
  class_id: number | undefined;
  order_by: "update_time";
  update_time__gte: string;
  update_time__lte: string;
  hashtags__id__in: number | undefined;
  page: number;
  page_size: 100;
  picture_type__in?: string;
  studentpicture__student_id?: number;
};
const getPublishedPictures = async (
  page: number
): Promise<PublishedPictureResponse> => {
  try {
    const { startDate, endDate, classId, studentId, hashtagId, isFavorite } =
      store.getState().pictureSearch;
    const params: PublishedPictureParam = {
      public_status: 3,
      is_favorite: isFavorite || undefined,
      class_id: classId || undefined,
      order_by: "update_time",
      update_time__gte: startDate,
      update_time__lte: endDate,
      hashtags__id__in: hashtagId || undefined,
      page,
      page_size: PICTURE_PAGE_SIZE,
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
    const res = await axiosInstance.get("/v1/pictures/", { params });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const uploadPicture = async (
  pictureFormData: UploadPictureFormData
): Promise<Picture[]> => {
  try {
    const formData = new FormData();
    for (let id of pictureFormData.classId) {
      formData.append("class_ids", id);
    }
    formData.append("picture_type", pictureFormData.pictureType.toString());
    formData.append("original_picture", pictureFormData.picture);

    const res = await axiosInstance.post("/v1/pictures/many/", formData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const getUnpublishedPictures = async (classId: number): Promise<Picture[]> => {
  try {
    const params = {
      class_id: classId,
      public_status__in: "0,1,2",
    };
    const res = await axiosInstance.get("/v1/pictures/", { params });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const publishPicture = async (formData: PublishPictureFormData) => {
  try {
    await axiosInstance.post("/v1/publish_pictures/", formData);
  } catch (e) {
    throw e;
  }
};

const updatePicturePublishStatus = async (
  id: number,
  formData: UpdatePublishStatusFormData
): Promise<Picture> => {
  try {
    await axiosInstance.patch(`/v1/pictures/${id}/`, formData);
    const res = await axiosInstance.get(`/v1/pictures/${id}/`);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const updatePictureType = async (
  id: number,
  formData: UpdatePictureTypeFormData
): Promise<Picture> => {
  try {
    await axiosInstance.patch(`/v1/pictures/${id}/`, formData);
    const res = await axiosInstance.get(`/v1/pictures/${id}/`);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const updateIsFavorite = async (
  id: number,
  formData: UpdateIsFavoriteFormData
): Promise<Picture> => {
  try {
    const res = await axiosInstance.patch(`/v1/pictures/${id}/`, formData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const deletePicture = async (id: number) => {
  try {
    await axiosInstance.delete(`/v1/pictures/${id}/`);
  } catch (e) {
    throw e;
  }
};

const getTagStudent = async (pictureId: number): Promise<TagStudent[]> => {
  try {
    const params = {
      picture_id: pictureId,
    };
    const res = await axiosInstance.get("/v1/student_pictures/", { params });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const tagStudent = async (
  formData: AddTagStudentFormData
): Promise<TagStudent> => {
  try {
    const res = await axiosInstance.post("/v1/student_pictures/", formData);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const removeStudentTag = async (id: number) => {
  try {
    await axiosInstance.delete(`/v1/student_pictures/${id}/`);
  } catch (e) {
    throw e;
  }
};

const getPictureGroupByStudent = async (
  classId: number
): Promise<PictureGroupByStudent[]> => {
  try {
    const params = {
      class_id: classId,
      order_by: "last_name_kata,first_name_kata",
    };
    const res = await axiosInstance.get("/v1/students/get_picture_tagged/", {
      params,
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const getRecentlyUsedHashtags = async (
  total: number
): Promise<RecentActivityTagResponse> => {
  try {
    const params = {
      order_by: "used_time",
      page: 1,
      page_size: total,
    };
    const res = await axiosInstance.get("/v1/hashtags/", { params });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const addHashTag = async (pictureIds: number[], hashtagId: number) => {
  try {
    const body = {
      picture_ids: pictureIds,
      hashtag_id: hashtagId,
    };
    await axiosInstance.post("/v1/pictures/add_hashtag/", body);
  } catch (e) {
    throw e;
  }
};

const removeHashTag = async (pictureIds: number[], hashtagId: number) => {
  try {
    const body = {
      picture_ids: pictureIds,
      hashtag_id: hashtagId,
    };
    await axiosInstance.post("/v1/pictures/remove_hashtag/", body);
  } catch (e) {
    throw e;
  }
};

const createNewHashTag = async (name: string): Promise<ActivityTag> => {
  const tag = name.replace("#", "");
  try {
    const body = {
      name: tag,
    };
    const res = await axiosInstance.post("/v1/hashtags/", body);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const updateHashTagUsedTime = async (hashTagIds: number[]) => {
  try {
    const body = {
      hashtag_ids: hashTagIds,
    };
    await axiosInstance.post("/v1/hashtags/update_used_time/", body);
  } catch (e) {
    throw e;
  }
};

const searchHashTag = async (searchValue: string): Promise<ActivityTag[]> => {
  try {
    const params = {
      name__istartswith: searchValue,
    };
    const res = await axiosInstance.get("/v1/hashtags/", { params });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const getHashTagById = async (id: number): Promise<ActivityTag> => {
  try {
    const res = await axiosInstance.get(`/v1/hashtags/${id}/`);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export {
  getRandomPictures,
  getPublishedPictures,
  uploadPicture,
  getUnpublishedPictures,
  publishPicture,
  updatePicturePublishStatus,
  updatePictureType,
  updateIsFavorite,
  deletePicture,
  getTagStudent,
  tagStudent,
  removeStudentTag,
  getPictureGroupByStudent,
  getRecentlyUsedHashtags,
  addHashTag,
  removeHashTag,
  createNewHashTag,
  updateHashTagUsedTime,
  searchHashTag,
  getHashTagById,
};
