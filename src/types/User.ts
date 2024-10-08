export type User = {
  id: number;
  login_key: string;
  first_name: string;
  last_name: string;
  first_name_kata: string;
  last_name_kata: string;
  role: string;
};

export type ChangePasswordFormData = {
  old_password: string;
  new_password: string;
  verify_password: string;
};
