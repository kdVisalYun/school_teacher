import { createSlice } from "@reduxjs/toolkit";

import { getFacility, updateFacilityAndPrincipal } from "./facilityAction";
import type { Facility } from "types/Facility";

interface facilityState {
  loading: boolean;
  facility: Facility | null;
  error: string;
  success: boolean;
}

const initialState: facilityState = {
  loading: false,
  facility: null,
  error: "",
  success: false,
};

const facilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFacility.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.facility = null;
    });
    builder.addCase(getFacility.fulfilled, (state, { payload }) => {
      state.facility = payload.facility;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getFacility.rejected, (state, { payload }) => {
      state.error = payload || "_generic._unknown_error";
      state.loading = false;
    });
    builder.addCase(updateFacilityAndPrincipal.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(
      updateFacilityAndPrincipal.fulfilled,
      (state, { payload }) => {
        state.facility = payload.facility;
        state.success = true;
        state.loading = false;
      }
    );
    builder.addCase(
      updateFacilityAndPrincipal.rejected,
      (state, { payload }) => {
        state.error = payload || "_generic._unknown_error";
        state.loading = false;
      }
    );
  },
});

export default facilitySlice.reducer;
