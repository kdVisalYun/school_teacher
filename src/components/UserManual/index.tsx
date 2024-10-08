import { useState, useEffect } from "react";

import BackIcon from "assets/icons/BackIcon";
import Categories from "./Categories";
import Content from "./Content";
import { getUserManual } from "services/supportMaterialServices";
import useAppDispatch from "hooks/useAppDispatch";
import { setErrorStatus } from "features/error/errorSlice";
import type { UserManual } from "types/SupportMaterial";
import LoadingDialog from "components/__reusable/LoadingDialog";

const UserManualPage = () => {
  const [manuals, setManuals] = useState<UserManual[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(0);
      return;
    }
    window.history.back();
  };

  const dispatch = useAppDispatch();
  const fetchUserManual = async () => {
    try {
      const manuals = await getUserManual();
      setManuals(manuals);
    } catch (e) {
      dispatch(setErrorStatus(""));
    }
  };
  useEffect(() => {
    fetchUserManual();
  }, []);

  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <button
        className="w-fit p-2 rounded-full bg-white drop-shadow-[2px_2px_6px_rgba(0,0,0,0.1)]"
        onClick={handleBack}
      >
        <BackIcon width={32} height={32} color={"#000000"} />
      </button>
      {isLoading && <LoadingDialog />}
      {selectedCategory ? (
        <Content
          manuals={manuals.filter(
            (manual) => manual.category_id === selectedCategory
          )}
        />
      ) : (
        <Categories
          manuals={manuals}
          onSelect={(categoryId) => setSelectedCategory(categoryId)}
        />
      )}
    </section>
  );
};

export default UserManualPage;
