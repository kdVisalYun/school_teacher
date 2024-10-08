import { createAsyncThunk } from "@reduxjs/toolkit";

import { updateUser } from "features/user/userSlice";
import { getFacility as get, updateFacility } from "services/facilityServices";
import { updateUser as update } from "services/userServices";
import type {
  Facility,
  FacilityFormInfo,
  PrincipalFormInfo,
} from "types/Facility";

const getFacility = createAsyncThunk<
  { facility: Facility },
  void,
  { rejectValue: string }
>("facility/getFacility", async (_: void, { rejectWithValue }) => {
  try {
    const facility = await get();
    return { facility };
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

const updateFacilityAndPrincipal = createAsyncThunk<
  { facility: Facility },
  {
    id: number;
    facilityFormData: FacilityFormInfo;
    principalFormData: PrincipalFormInfo;
  },
  { rejectValue: string }
>(
  "facility/updateFacility",
  async (
    { id, facilityFormData, principalFormData },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const facility = await updateFacility(id, facilityFormData);
      const user = await update(principalFormData);
      dispatch(updateUser({ user }));
      return { facility };
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

export { getFacility, updateFacilityAndPrincipal };
