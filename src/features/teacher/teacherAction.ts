import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getTeachers as get,
  createTeacher as create,
  updateTeacher as update,
  deleteTeacher as remove,
} from "services/teacherServices";
import type {
  DeleteTeacherFormData,
  Teacher,
  TeacherFormData,
} from "types/Teacher";

const getTeachers = createAsyncThunk<
  { teachers: Teacher[] },
  void,
  { rejectValue: string }
>("teacher/getTeachers", async (_: void, { rejectWithValue }) => {
  try {
    const teachers = await get();
    return { teachers };
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

const createTeacher = createAsyncThunk<
  { teacher: Teacher },
  { formData: TeacherFormData },
  { rejectValue: string }
>("teacher/createTeacher", async ({ formData }, { rejectWithValue }) => {
  try {
    const teacher = await create(formData);
    return { teacher };
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

const updateTeacher = createAsyncThunk<
  { teacher: Teacher },
  { id: number; formData: TeacherFormData },
  { rejectValue: string }
>("teacher/updateTeacher", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const teacher = await update(id, formData);
    return { teacher };
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

const deleteTeacher = createAsyncThunk<
  void,
  { id: number; formData: DeleteTeacherFormData },
  { rejectValue: string }
>("teacher/deleteTeacher", async ({ id, formData }, { rejectWithValue }) => {
  try {
    await remove(id, formData);
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

export { getTeachers, createTeacher, updateTeacher, deleteTeacher };
