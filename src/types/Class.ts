export type Class = {
  id: number;
  is_ai_completed: boolean;
  is_all_checked: boolean;
  is_picture_uploaded: boolean;
  name: string;
  number_of_student: number;
  year: number;
  remain_ai_picture: number;
};

export type ClassFormData = {
  name: string;
  year: string;
};
