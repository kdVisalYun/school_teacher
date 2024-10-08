export type Student = {
  id: number;
  profile_picture_for_admin: string | null;
  first_name: string;
  last_name: string;
  first_name_kata: string;
  last_name_kata: string;
  activate_code: string;
  birthday: string;
  parent: {
    create_time: string;
  } | null;
  class_id: number;
  is_ng: boolean;
  graduation_date: string;
};

export type StudentClass = {
  student_info: Student;
};

export type StudentFormData = {
  first_name: string;
  last_name: string;
  first_name_kata: string;
  last_name_kata: string;
  birthday: string;
  class_id: string;
  is_ng: boolean;
  graduation_date: string;
};

export type UpdateClassFormData = {
  student_ids: number[];
  class_id: number;
};
