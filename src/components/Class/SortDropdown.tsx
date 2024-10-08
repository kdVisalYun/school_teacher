import { useEffect } from "react";

import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { ClassSortValue } from "config/constants";
import SortInput from "components/__reusable/SortInput";
import type { SortInputOption } from "types/SortInputOption";
import { setSortBy } from "features/class/classSlice";

const OPTIONS: SortInputOption[] = [
  {
    label: "_class._class_name",
    value: {
      asc: ClassSortValue.name_asc,
      desc: ClassSortValue.name_dsc,
    },
  },
];

const SortDropdown = () => {
  const dispatch = useAppDispatch();
  const { sortBy } = useAppSelector((state) => state.class);

  useEffect(() => {
    return () => {
      dispatch(setSortBy({ sortBy: ClassSortValue.name_asc }));
    };
  }, []);

  return (
    <SortInput
      options={OPTIONS}
      value={sortBy}
      onChange={(value) =>
        dispatch(setSortBy({ sortBy: value as ClassSortValue }))
      }
    />
  );
};

export default SortDropdown;
