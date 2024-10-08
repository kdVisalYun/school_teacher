import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getStudents as get,
  createStudent as create,
  updateStudent as update,
  changeProfilePicture as changePicture,
  deleteStudent as remove,
  updateClass,
} from "services/studentServices";
import {
  uploadTrainingPicture,
  updateTrainingPicture as updatePicture,
  deleteTrainingPicture,
} from "services/trainingPictureServices";
import { StudentSortValue, TrainingPictureOperation } from "config/constants";
import { Student, StudentFormData, UpdateClassFormData } from "types/Student";
import type { UpdatedTrainingPicture } from "types/TrainingPicture";

const getStudents = createAsyncThunk<
  { students: Student[] },
  { classId: number; sortValue: StudentSortValue },
  { rejectValue: string }
>(
  "students/getStudents",
  async ({ classId, sortValue }, { rejectWithValue }) => {
    try {
      const students = await get(classId, sortValue);
      return { students };
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

const createStudent = createAsyncThunk<
  { student: Student },
  { formData: StudentFormData; trainingPictures: File[] },
  { rejectValue: string }
>(
  "students/createStudent",
  async ({ formData, trainingPictures }, { rejectWithValue }) => {
    try {
      const student = await create(formData);
      for (let picture of trainingPictures) {
        await uploadTrainingPicture(student.id, picture);
      }
      return { student };
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

const createMultipleStudents = createAsyncThunk<
  { students: Student[] },
  { formData: StudentFormData[] },
  { rejectValue: string }
>(
  "students/createMultipleStudent",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const createdStudents = [];
      for (let studentFormData of formData) {
        try {
          const student = await create(studentFormData);
          createdStudents.push(student);
        } catch (e) {
          for (let student of createdStudents) {
            await remove(student.id);
          }
          throw new Error("_student_form._file_error_content");
        }
      }
      return { students: createdStudents };
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

const updateStudent = createAsyncThunk<
  { student: Student },
  {
    id: number;
    formData: StudentFormData;
    trainingPictures: File[];
    updatedTrainingPictures: UpdatedTrainingPicture[];
  },
  { rejectValue: string }
>(
  "students/updateStudent",
  async (
    { id, formData, trainingPictures, updatedTrainingPictures },
    { rejectWithValue }
  ) => {
    try {
      const student = await update(id, formData);
      await updateTrainingPicture(updatedTrainingPictures);
      for (let picture of trainingPictures) {
        await uploadTrainingPicture(student.id, picture);
      }
      return { student };
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);
const updateTrainingPicture = async (
  updatedTrainingPictures: UpdatedTrainingPicture[]
) => {
  try {
    for (let picture of updatedTrainingPictures) {
      switch (picture.operation) {
        case TrainingPictureOperation.use:
          await updatePicture(picture.id, true);
          break;
        case TrainingPictureOperation.unuse:
          await updatePicture(picture.id, false);
          break;
        case TrainingPictureOperation.delete:
          await deleteTrainingPicture(picture.id);
          break;
        default:
          break;
      }
    }
  } catch (e) {
    throw e;
  }
};

const updateClasForStudent = createAsyncThunk<
  { formData: UpdateClassFormData },
  { formData: UpdateClassFormData },
  { rejectValue: string }
>("students/updateClass", async ({ formData }, { rejectWithValue }) => {
  try {
    await updateClass(formData);
    return { formData };
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

const changeProfilePicture = createAsyncThunk<
  { student: Student },
  { id: number; picture: string },
  { rejectValue: string }
>(
  "students/changeProfilePicture",
  async ({ id, picture }, { rejectWithValue }) => {
    try {
      const student = await changePicture(id, picture);
      return { student };
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

const deleteStudent = createAsyncThunk<
  { id: number },
  { id: number },
  { rejectValue: string }
>("students/deleteStudent", async ({ id }, { rejectWithValue }) => {
  try {
    await remove(id);
    return { id };
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

export {
  getStudents,
  createStudent,
  createMultipleStudents,
  updateStudent,
  updateClasForStudent,
  changeProfilePicture,
  deleteStudent,
};
