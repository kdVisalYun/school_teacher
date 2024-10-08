import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { StudentSortValue } from "config/constants";
import { setSortBy } from "features/student/studentSlice";
import SortInput from "components/__reusable/SortInput";
import type { SortInputOption } from "types/SortInputOption";

const OPTIONS: SortInputOption[] = [
  {
    label: "_student_form._student_name",
    value: {
      asc: StudentSortValue.name_asc,
      desc: StudentSortValue.name_dsc,
    },
  },
  {
    label: "_student_form._birthday",
    value: {
      asc: StudentSortValue.birthday_asc,
      desc: StudentSortValue.birthday_dsc,
    },
  },
];

const SortDropdown = () => {
  const dispatch = useAppDispatch();
  const { sortBy } = useAppSelector((state) => state.student);

  return (
    <SortInput
      options={OPTIONS}
      value={sortBy}
      onChange={(value) =>
        dispatch(setSortBy({ sortBy: value as StudentSortValue }))
      }
    />
  );
};

export default SortDropdown;
