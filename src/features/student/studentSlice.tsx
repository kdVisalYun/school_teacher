import { createSlice } from "@reduxjs/toolkit";

import {
  getStudents,
  createStudent,
  createMultipleStudents,
  updateStudent,
  updateClasForStudent,
  deleteStudent,
  changeProfilePicture,
} from "./studentAction";
import { StudentSortValue } from "config/constants";
import type { Student } from "types/Student";

interface studentState {
  loading: boolean;
  students: Student[];
  sortBy: StudentSortValue;
  selectedStudents: Student[];
  error: string;
  success: boolean;
}

const initialState: studentState = {
  loading: false,
  students: [],
  sortBy: StudentSortValue.name_asc,
  selectedStudents: [],
  error: "",
  success: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setSortBy: (
      state,
      action: { type: string; payload: { sortBy: StudentSortValue } }
    ) => {
      state.sortBy = action.payload.sortBy;
    },
    resetSortBy: (state) => {
      state.sortBy = StudentSortValue.name_asc;
    },
    setSelectedStudents: (
      state,
      action: { type: string; payload: { isAdd: boolean; student: Student } }
    ) => {
      if (action.payload.isAdd) {
        state.selectedStudents = [
          ...state.selectedStudents,
          action.payload.student,
        ];
      } else {
        const index = state.selectedStudents.findIndex(
          (student) => student.id === action.payload.student.id
        );
        state.selectedStudents.splice(index, 1);
      }
    },
    resetSelectedStudents: (state) => {
      state.selectedStudents = [];
    },
    setNewClass: (
      state,
      action: { type: string; payload: { id: number; classId: number } }
    ) => {
      const index = state.selectedStudents.findIndex(
        (student) => student.id === action.payload.id
      );
      if (index >= 0)
        state.selectedStudents[index].class_id = action.payload.classId;
    },
    resetStudent: (state) => {
      state.students = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStudents.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.students = [];
    });
    builder.addCase(getStudents.fulfilled, (state, { payload }) => {
      state.students = payload.students;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getStudents.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
    builder.addCase(createStudent.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(createStudent.fulfilled, (state, { payload }) => {
      state.students = [...state.students, payload.student];
      state.success = true;
      state.loading = false;
    });
    builder.addCase(createStudent.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
    builder.addCase(createMultipleStudents.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(createMultipleStudents.fulfilled, (state, { payload }) => {
      state.students = [...state.students, ...payload.students];
      state.success = true;
      state.loading = false;
    });
    builder.addCase(createMultipleStudents.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
    builder.addCase(updateStudent.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateStudent.fulfilled, (state, { payload }) => {
      const index = state.students.findIndex(
        (student) => student.id === payload.student.id
      );
      if (index >= 0) state.students[index] = payload.student;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(updateStudent.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
    builder.addCase(updateClasForStudent.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateClasForStudent.fulfilled, (state, { payload }) => {
      for (let studentId of payload.formData.student_ids) {
        const index = state.students.findIndex(
          (student) => student.id === studentId
        );
        if (index >= 0) state.students.splice(index, 1);
      }
      state.success = true;
      state.loading = false;
      state.selectedStudents = [];
    });
    builder.addCase(updateClasForStudent.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
    builder.addCase(changeProfilePicture.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(changeProfilePicture.fulfilled, (state, { payload }) => {
      const index = state.students.findIndex(
        (student) => student.id === payload.student.id
      );
      if (index >= 0) state.students[index] = payload.student;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(changeProfilePicture.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
    builder.addCase(deleteStudent.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(deleteStudent.fulfilled, (state, { payload }) => {
      state.success = true;
      state.loading = false;
      const index = state.students.findIndex(
        (student) => student.id === payload.id
      );
      if (index >= 0) state.students.splice(index, 1);
    });
    builder.addCase(deleteStudent.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
  },
});

export const {
  setSortBy,
  resetSortBy,
  setSelectedStudents,
  resetSelectedStudents,
  setNewClass,
  resetStudent,
} = studentSlice.actions;
export default studentSlice.reducer;
