import axiosInstance from "config/axiosInstance";
import type { Facility, FacilityFormInfo } from "types/Facility";

const getFacility = async (): Promise<Facility> => {
  try {
    const response = await axiosInstance.get("/v1/facilities/");
    if (response.data.length === 0) throw new Error("No data!");
    return response.data[0];
  } catch (e) {
    throw e;
  }
};

const updateFacility = async (
  id: number,
  formData: FacilityFormInfo
): Promise<Facility> => {
  try {
    const response = await axiosInstance.patch(
      `/v1/facilities/${id}/`,
      formData
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

export { getFacility, updateFacility };
