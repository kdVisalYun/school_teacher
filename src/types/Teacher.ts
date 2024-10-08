import type { Class } from "./Class";

export type Teacher = {
  id: Number;
  first_name: string;
  last_name: string;
  first_name_kata: string;
  last_name_kata: string;
  login_key: string;
  staff_class: Class[];
  delete_time: string | null;
};

export type TeacherFormData = {
  first_name: string;
  last_name: string;
  first_name_kata: string;
  last_name_kata: string;
  login_key: string;
  staff_class: string[];
  password?: string;
};

export type DeleteTeacherFormData = {
  delete_time: string;
};
