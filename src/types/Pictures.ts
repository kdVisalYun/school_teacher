import { PictureType, PicturePublishStatus } from "config/constants";
import type { ActivityTag } from "./ActivityTag";

export type Picture = {
  ai_execution_time: string | null;
  class_id: number;
  create_time: string;
  id: number;
  is_favorite: boolean;
  is_taged: boolean;
  is_taged_by_ai: boolean;
  job_status: number;
  original_picture: string;
  picture_type: number;
  public_status: number;
  thumbnail_picture: string;
  total_favorite: number;
  total_views: number;
  update_time: string;
  hashtags_info: ActivityTag[];
  converted_picture: string;
};

export type RandomPicture = {
  id: number;
  converted_picture: string;
};

export type PublishedPictureResponse = {
  count: number;
  results: Picture[];
};

export type UploadPicture = {
  id: number;
  picture: File;
  thumbnailPicture: File;
};

export type UploadPictureQueue = {
  id: string;
  classId: string[];
  pictureType: PictureType;
  picturesBatch: UploadPicture[];
};

export type UploadPictureFormData = {
  classId: string[];
  pictureType: PictureType;
  picture: File;
};

export type PublishPictureFormData = {
  picture_ids: number[];
  not_good_picture_ids: number[];
};

export type PictureGroupByUploadDate = {
  uploadDate: string;
  pictures: Picture[];
};

export type UpdatePublishStatusFormData = {
  public_status: PicturePublishStatus;
};

export type UpdatePictureTypeFormData = {
  picture_type: PictureType;
};

export type UpdateIsFavoriteFormData = {
  is_favorite: boolean;
};

export type PictureGroupByStudent = {
  id: number;
  first_name: string;
  last_name: string;
  first_name_kata: string;
  last_name_kata: string;
  profile_picture_for_admin: string;
  student_pictures: {
    id: number;
    picture: {
      id: number;
      thumbnail_picture: string;
    };
  }[];
};
