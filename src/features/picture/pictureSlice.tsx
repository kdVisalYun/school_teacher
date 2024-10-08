import { createSlice } from "@reduxjs/toolkit";

import { generate } from "utilities/RandomStringGenerator";
import {
  getUnpublishedPictures,
  updatePicturePublishStatus,
  updatePictureType,
  updateIsFavoriteStatus,
} from "./pictureAction";
import type {
  UploadPictureQueue,
  Picture,
  UploadPicture,
} from "types/Pictures";
import type { ActivityTag } from "types/ActivityTag";
import { PicturePublishStatus } from "config/constants";

interface pictureState {
  loading: boolean;
  pictures: Picture[];
  viewedPicture: Picture | null;
  uploadQueue: UploadPictureQueue[];
  error: string;
  success: boolean;
}

const initialState: pictureState = {
  loading: false,
  pictures: [],
  viewedPicture: null,
  uploadQueue: [],
  error: "",
  success: false,
};

const pictureSlice = createSlice({
  name: "picture",
  initialState,
  reducers: {
    addToUploadQueue: (
      state,
      action: {
        type: string;
        payload: {
          classId: string[];
          pictureType: number;
          uploadPictures: UploadPicture[];
        };
      }
    ) => {
      state.uploadQueue.push({
        id: generate(5),
        picturesBatch: action.payload.uploadPictures,
        classId: action.payload.classId,
        pictureType: action.payload.pictureType,
      });
    },
    removePictureFromBatch: (
      state,
      action: { type: string; payload: { batchId: string; pictureId: number } }
    ) => {
      const batchIndex = state.uploadQueue.findIndex(
        (batch) => batch.id === action.payload.batchId
      );
      if (batchIndex >= 0) {
        const pictureIndex = state.uploadQueue[
          batchIndex
        ].picturesBatch.findIndex(
          (picture) => picture.id === action.payload.pictureId
        );
        if (pictureIndex >= 0)
          state.uploadQueue[batchIndex].picturesBatch.splice(pictureIndex, 1);
      }
    },
    removeBatchFromQueue: (
      state,
      action: { type: string; payload: { batchId: string } }
    ) => {
      const batchIndex = state.uploadQueue.findIndex(
        (batch) => batch.id === action.payload.batchId
      );
      if (batchIndex >= 0) state.uploadQueue.splice(batchIndex, 1);
    },
    cancelUpload: (
      state,
      action: { type: string; payload: { batchId: string } }
    ) => {
      const batchIndex = state.uploadQueue.findIndex(
        (batch) => batch.id === action.payload.batchId
      );
      if (batchIndex >= 0)
        state.uploadQueue[batchIndex].picturesBatch.splice(1);
    },
    setViewPicture: (
      state,
      action: { type: string; payload: { picture: Picture | null } }
    ) => {
      state.viewedPicture = action.payload.picture;
    },
    updatePictureTagStatus: (
      state,
      action: { type: string; payload: { id: number; isTagged: boolean } }
    ) => {
      const index = state.pictures.findIndex(
        (picture) => picture.id === action.payload.id
      );
      if (index >= 0) state.pictures[index].is_taged = action.payload.isTagged;
    },
    updatePublishStatus: (
      state,
      action: {
        type: string;
        payload: { id: number; publishStatus: PicturePublishStatus };
      }
    ) => {
      const index = state.pictures.findIndex(
        (picture) => picture.id === action.payload.id
      );
      if (index >= 0)
        state.pictures[index].public_status = action.payload.publishStatus;
    },
    setPictures: (
      state,
      action: { type: string; payload: { pictures: Picture[] } }
    ) => {
      state.pictures = action.payload.pictures;
    },
    resetPicture: (state) => {
      state.pictures = [];
    },
    addHashTag: (
      state,
      action: {
        type: string;
        payload: { pictureId: number; hashTag: ActivityTag };
      }
    ) => {
      const index = state.pictures.findIndex(
        (picture) => picture.id === action.payload.pictureId
      );
      if (index >= 0)
        state.pictures[index].hashtags_info.push(action.payload.hashTag);
    },
    removeHashTag: (
      state,
      action: {
        type: string;
        payload: { pictureId: number; hashTagId: number };
      }
    ) => {
      const index = state.pictures.findIndex(
        (picture) => picture.id === action.payload.pictureId
      );
      if (index >= 0) {
        const hashTagIndex = state.pictures[index].hashtags_info.findIndex(
          (tag) => tag.id === action.payload.hashTagId
        );
        state.pictures[index].hashtags_info.splice(hashTagIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUnpublishedPictures.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.pictures = [];
    });
    builder.addCase(getUnpublishedPictures.fulfilled, (state, { payload }) => {
      state.pictures = payload.pictures;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getUnpublishedPictures.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
    builder.addCase(
      updatePicturePublishStatus.fulfilled,
      (state, { payload }) => {
        const index = state.pictures.findIndex(
          (picture) => picture.id === payload.picture.id
        );
        if (index >= 0) {
          if (payload.picture.public_status === PicturePublishStatus.deleted)
            state.pictures.splice(index, 1);
          else state.pictures[index] = payload.picture;
        }
      }
    );
    builder.addCase(updatePictureType.fulfilled, (state, { payload }) => {
      const index = state.pictures.findIndex(
        (picture) => picture.id === payload.picture.id
      );
      if (index >= 0) state.pictures[index] = payload.picture;
    });
    builder.addCase(updateIsFavoriteStatus.fulfilled, (state, { payload }) => {
      const index = state.pictures.findIndex(
        (picture) => picture.id === payload.picture.id
      );
      if (index >= 0) state.pictures[index] = payload.picture;
    });
  },
});

export const {
  addToUploadQueue,
  removePictureFromBatch,
  removeBatchFromQueue,
  cancelUpload,
  setViewPicture,
  updatePictureTagStatus,
  updatePublishStatus,
  setPictures,
  resetPicture,
  addHashTag,
  removeHashTag,
} = pictureSlice.actions;
export default pictureSlice.reducer;
