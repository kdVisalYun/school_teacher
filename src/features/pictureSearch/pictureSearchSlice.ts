import { createSlice } from "@reduxjs/toolkit";

import { PictureStudentOption } from "config/constants";

interface pictureSearchState {
  startDate: string;
  endDate: string;
  classId: number | null;
  studentId: number | PictureStudentOption | null;
  hashtagId: number | null;
  isFavorite: boolean | null;
}

const startDate = new Date();
startDate.setHours(0, 0, 0, 0);
const endDate = new Date(startDate);
endDate.setHours(23, 59, 59, 999);

const initialState: pictureSearchState = {
  startDate: startDate.toISOString(),
  endDate: endDate.toISOString(),
  classId: null,
  studentId: null,
  hashtagId: null,
  isFavorite: null,
};

const pictureSearchSlice = createSlice({
  name: "pictureSearch",
  initialState,
  reducers: {
    setDate: (
      state,
      action: { type: string; payload: { startDate: string; endDate: string } }
    ) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    setClassId: (
      state,
      action: { type: string; payload: { classId: number | null } }
    ) => {
      state.classId = action.payload.classId;
      if (action.payload.classId === null) {
        state.studentId = null;
      }
    },
    setStudentId: (
      state,
      action: {
        type: string;
        payload: { studentId: number | PictureStudentOption | null };
      }
    ) => {
      state.studentId = action.payload.studentId;
    },
    setHashtag: (
      state,
      action: { type: string; payload: { hashtagId: number | null } }
    ) => {
      state.hashtagId = action.payload.hashtagId;
    },
    setIsFavorite: (
      state,
      action: { type: string; payload: { isFavorite: boolean } }
    ) => {
      state.isFavorite = action.payload.isFavorite;
    },
    reset: (state) => {
      state.startDate = startDate.toISOString();
      state.endDate = endDate.toISOString();
      state.classId = null;
      state.studentId = null;
      state.hashtagId = null;
      state.isFavorite = false;
    },
  },
});

export const {
  setDate,
  setClassId,
  setStudentId,
  setHashtag,
  setIsFavorite,
  reset,
} = pictureSearchSlice.actions;
export default pictureSearchSlice.reducer;
