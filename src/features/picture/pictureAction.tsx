import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getUnpublishedPictures as fetchUnpublishedPictures,
  updatePicturePublishStatus as updatePublishStatus,
  updatePictureType as updateType,
  updateIsFavorite,
} from "services/pictureServices";
import type {
  Picture,
  UpdatePublishStatusFormData,
  UpdatePictureTypeFormData,
  UpdateIsFavoriteFormData,
} from "types/Pictures";

const getUnpublishedPictures = createAsyncThunk<
  { pictures: Picture[] },
  { classId: number },
  { rejectValue: string }
>(
  "pictures/getUnpublishedPictures",
  async ({ classId }, { rejectWithValue }) => {
    try {
      const pictures = await fetchUnpublishedPictures(classId);
      return { pictures };
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

const updatePicturePublishStatus = createAsyncThunk<
  { picture: Picture },
  { id: number; formData: UpdatePublishStatusFormData },
  { rejectValue: string }
>(
  "pictures/updatePicturePublishStatus",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const picture = await updatePublishStatus(id, formData);

      return { picture };
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

const updatePictureType = createAsyncThunk<
  { picture: Picture },
  { id: number; formData: UpdatePictureTypeFormData },
  { rejectValue: string }
>(
  "pictures/updatePictureType",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const picture = await updateType(id, formData);
      return { picture };
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

const updateIsFavoriteStatus = createAsyncThunk<
  { picture: Picture },
  { id: number; formData: UpdateIsFavoriteFormData },
  { rejectValue: string }
>(
  "pictures/updateIsFavoriteStatus",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const picture = await updateIsFavorite(id, formData);
      return { picture };
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

export {
  getUnpublishedPictures,
  updatePicturePublishStatus,
  updatePictureType,
  updateIsFavoriteStatus,
};
