import { createSlice } from "@reduxjs/toolkit";

import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "./teacherAction";
import type { Teacher } from "types/Teacher";

interface teacherState {
  loading: boolean;
  teachers: Teacher[];
  error: string;
  success: boolean;
}

const initialState: teacherState = {
  loading: false,
  teachers: [],
  error: "",
  success: false,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeachers.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = false;
    });
    builder.addCase(getTeachers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.teachers = payload.teachers;
    });
    builder.addCase(getTeachers.rejected, (state, { payload }) => {
      state.loading = true;
      state.error = payload || "_generic._unknown_error";
    });
    builder.addCase(createTeacher.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = false;
    });
    builder.addCase(createTeacher.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.teachers = [...state.teachers, payload.teacher];
    });
    builder.addCase(createTeacher.rejected, (state, { payload }) => {
      state.loading = true;
      state.error = payload || "_generic._unknown_error";
    });
    builder.addCase(updateTeacher.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = false;
    });
    builder.addCase(updateTeacher.fulfilled, (state, { payload }) => {
      const index = state.teachers.findIndex(
        (teacher) => teacher.id === payload.teacher.id
      );
      if (index >= 0) state.teachers[index] = payload.teacher;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updateTeacher.rejected, (state, { payload }) => {
      state.loading = true;
      state.error = payload || "_generic._unknown_error";
    });
    builder.addCase(deleteTeacher.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = false;
    });
    builder.addCase(deleteTeacher.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deleteTeacher.rejected, (state, { payload }) => {
      state.loading = true;
      state.error = payload || "_generic._unknown_error";
    });
  },
});

export default teacherSlice.reducer;
