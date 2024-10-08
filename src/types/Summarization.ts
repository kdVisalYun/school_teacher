export type SummarizationByDate = {
  date: string;
  number_published_picture: number;
};

export type SummarizationByClass = {
  date: string;
  number_published_picture: number;
  class_id: number;
  class_name: string;
};

export type SummarizationByStudent = {
  student_id: number;
  first_name: string;
  last_name: string;
  first_name_kata: string;
  last_name_kata: string;
  profile_picture: string;
  total_pictures: number;
};

export type SummaryStudentPicture = {
  student_id: number;
  student_id__first_name: string;
  student_id__last_name: string;
  student_id__first_name_kata: string;
  student_id__last_name_kata: string;
  number_tags: number;
};

export type PictureSummarizationNavState = {
  prevPath: string | undefined;
};
