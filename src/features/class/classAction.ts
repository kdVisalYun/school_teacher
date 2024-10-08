import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getClasses as get,
  getClassesFromAcademicYear,
  createClass as create,
  updateClass as update,
  deleteClass as remove,
} from "services/classServices";
import type { Class, ClassFormData } from "types/Class";

const getClasses = createAsyncThunk<
  { classes: Class[] },
  void,
  { rejectValue: string }
>("class/getClasses", async (_: void, { rejectWithValue }) => {
  try {
    const classes = await get();
    return { classes };
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

const getClassesOfAcademicYear = createAsyncThunk<
  { classes: Class[] },
  { year: number },
  { rejectValue: string }
>("class/getClassesOfAcademicYear", async ({ year }, { rejectWithValue }) => {
  try {
    const classes = await getClassesFromAcademicYear(year);
    return { classes };
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

const createClass = createAsyncThunk<
  { class: Class },
  { formData: ClassFormData },
  { rejectValue: string }
>("class/createClass", async ({ formData }, { rejectWithValue }) => {
  try {
    const newClass = await create(formData);
    return { class: newClass };
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

const updateClass = createAsyncThunk<
  { class: Class },
  { id: number; formData: ClassFormData },
  { rejectValue: string }
>("class/updateClass", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const updatedClass = await update(id, formData);
    return { class: updatedClass };
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

const deleteClass = createAsyncThunk<
  { id: number },
  { id: number },
  { rejectValue: string }
>("class/deleteClass", async ({ id }, { rejectWithValue }) => {
  try {
    await remove(id);
    return { id };
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

export {
  getClasses,
  getClassesOfAcademicYear,
  createClass,
  updateClass,
  deleteClass,
};
