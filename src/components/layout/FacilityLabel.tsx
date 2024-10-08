import { useCallback, useEffect } from "react";

import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { getFacility } from "features/facility/facilityAction";

const FacilityLabel = () => {
  const { facility } = useAppSelector((state) => state.facility);

  const dispatch = useAppDispatch();
  const fetchFacility = () => !facility && dispatch(getFacility());
  const callFetchFacility = useCallback(fetchFacility, [
    facility,
    dispatch,
    getFacility,
  ]);
  useEffect(() => {
    callFetchFacility();
  }, [callFetchFacility]);

  return <h4 className="text-lg font-semibold">{facility && facility.name}</h4>;
};

export default FacilityLabel;
