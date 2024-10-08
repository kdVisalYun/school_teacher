export type TagStudent = {
  id: number;
  axis_x: number;
  axis_y: number;
  student_id: number;
};

export type AddTagStudentFormData = {
  picture_id: number;
  student_id: number;
  axis_x: number;
  axis_y: number;
  rate?: 100;
};
