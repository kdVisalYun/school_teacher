import { createSlice } from "@reduxjs/toolkit";

import {
  getClasses,
  getClassesOfAcademicYear,
  createClass,
  updateClass,
  deleteClass,
} from "./classAction";
import { ClassSortValue } from "config/constants";
import type { Class } from "types/Class";

interface classState {
  loading: boolean;
  classes: Class[];
  sortBy: ClassSortValue;
  error: string;
  success: boolean;
}

const initialState: classState = {
  loading: false,
  classes: [],
  sortBy: ClassSortValue.name_asc,
  error: "",
  success: false,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setSortBy: (state, action: { payload: { sortBy: ClassSortValue } }) => {
      state.sortBy = action.payload.sortBy;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClasses.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.classes = [];
    });
    builder.addCase(getClasses.fulfilled, (state, { payload }) => {
      state.classes = payload.classes;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getClasses.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
    builder.addCase(getClassesOfAcademicYear.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.classes = [];
    });
    builder.addCase(
      getClassesOfAcademicYear.fulfilled,
      (state, { payload }) => {
        state.classes = payload.classes;
        state.success = true;
        state.loading = false;
      }
    );
    builder.addCase(getClassesOfAcademicYear.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
    builder.addCase(createClass.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(createClass.fulfilled, (state, { payload }) => {
      state.classes = [...state.classes, payload.class];
      state.success = true;
      state.loading = false;
    });
    builder.addCase(createClass.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
    builder.addCase(updateClass.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateClass.fulfilled, (state, { payload }) => {
      state.success = true;
      state.loading = false;
      const index = state.classes.findIndex((c) => c.id === payload.class.id);
      if (index >= 0) state.classes[index] = payload.class;
    });
    builder.addCase(updateClass.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
    builder.addCase(deleteClass.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(deleteClass.fulfilled, (state, { payload }) => {
      state.success = true;
      state.loading = false;
      const index = state.classes.findIndex((c) => c.id === payload.id);
      if (index >= 0) state.classes.splice(index, 1);
    });
    builder.addCase(deleteClass.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
  },
});

export default classSlice.reducer;
export const { setSortBy } = classSlice.actions;
