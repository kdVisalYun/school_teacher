export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const CLOUDFRONT_URL = process.env.REACT_APP_CLOUDFRONT_URL || "";
export const PARENTS_MATERIAL_URL =
  process.env.REACT_APP_PARENTS_MATERIAL_URL || "";
export const USER_MANUAL_URL = process.env.REACT_APP_USER_MANUAL_URL || "";
export const FAQ_URL = process.env.REACT_APP_FAQ_URL || "";
export enum SupportedLang {
  ja = "ja",
  en = "en",
}
export enum StudentSortValue {
  name_asc = "last_name_kata,first_name_kata",
  name_dsc = "-last_name_kata,-first_name_kata",
  birthday_asc = "birthday",
  birthday_dsc = "-birthday",
}
export enum PictureStudentOption {
  all = "all",
  class = "class",
}
export const PICTURE_PAGE_SIZE = 100;
export const LICENSED_SCHOOL_VALUE = 1;
export const AUTHORIZED_SCHOOL_VALUE = 2;
export const SMALL_SCHOOL_VALUE = 3;
export const NONLICENSED_SCHOOL_VALUE = 4;
export const KINDERGARTEN_VALUE = 5;
export const COMPANY_LED_SCHOOL_VALUE = 6;
export const AFTERSCHOOL_SCHOOL_VALUE = 7;
export const ELEMENTARY_SCHOOL_VALUE = 8;
export const CRAM_SCHOOL_VALUE = 9;
export const LEISURE_SCHOOL_VALUE = 10;
export const MIDDLE_SCHOOL_VALUE = 11;
export const OTHER_SCHOOL_VALUE = 99;
export enum PictureType {
  ai = 1,
  class = 2,
  non_ai = 3,
}
export enum PicturePublishStatus {
  non_checked = 0,
  good = 1,
  not_good = 2,
  published = 3,
  deleted = 4,
}
export enum TrainingPictureOperation {
  use = "use",
  unuse = "unuse",
  delete = "delete",
}
export enum ClassSortValue {
  name_asc = "name",
  name_dsc = "-name",
}
export const CROPPED_PICTURE_FILE_NAME_PREFIX = "cropped";
