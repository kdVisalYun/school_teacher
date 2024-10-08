import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Container from "components/__reusable/Container";
import Checkbox from "components/__reusable/Checkbox";
import UploadPictureStatus from "components/__reusable/UploadPictureStatus";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { getClasses } from "features/class/classAction";
import LoadingDialog from "components/__reusable/LoadingDialog";
import { UNPUBLISHED_PICTURES_PATH } from "router/pathName";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import PictureStatusDialog from "./PictureStatusDialog";
import type { Class } from "types/Class";
import RefreshIcon from "assets/icons/RefreshIcon";

const Summarization = () => {
  const { t } = useTranslation();

  const { classes, loading } = useAppSelector((state) => state.class);
  const dispatch = useAppDispatch();
  const fetchClasses = () => dispatch(getClasses());
  const callFetchClasses = useCallback(fetchClasses, [dispatch, getClasses]);
  useEffect(() => {
    callFetchClasses();
  }, [callFetchClasses]);

  const [selectedClasses, setSelectedClasses] = useState<Class[]>([]);
  const selectAllClasses = (status: boolean) => {
    if (status) setSelectedClasses(classes);
    else setSelectedClasses([]);
  };
  const selectClass = (status: boolean, c: Class) => {
    if (status) {
      setSelectedClasses([...selectedClasses, c]);
    } else {
      const temp = [...selectedClasses];
      const index = temp.findIndex((cl) => cl.id === c.id);
      if (index >= 0) temp.splice(index, 1);
      setSelectedClasses(temp);
    }
  };

  const [isOpenPublishDialog, setIsOpenPublishDialog] = useState(false);

  return (
    <div className="h-full flex flex-col space-y-3">
      {loading && <LoadingDialog />}
      <div className="flex items-center space-x-10">
        <h2 className="text-xl font-semibold">
          {t("_unpublished_picture._current_status")}
        </h2>
        <div className="w-fit">
          <button
            className="px-1 flex items-center space-x-2 border border-primary rounded text-primary bg-white"
            onClick={fetchClasses}
          >
            <RefreshIcon width={20} height={20} color={"black"} />
            <p>更新</p>
          </button>
        </div>
      </div>
      <div className="flex-1">
        <Container>
          <div className="h-full overflow-auto relative">
            <div className="w-full h-full absolute">
              {!loading && classes.length === 0 && (
                <p>{t("_generic._no_data")}</p>
              )}
              {!loading && classes.length > 0 && (
                <table className="w-full relative">
                  <thead className="border-b border-b-[#D9D9D9] bg-white sticky top-0 z-10">
                    <tr className="text-center">
                      <th className="p-2 w-3/12 lg:w-6/12 text-left">
                        <div className="flex space-x-2">
                          <Checkbox
                            name={"all"}
                            label={""}
                            isChecked={
                              selectedClasses.length === classes.length
                            }
                            onChange={selectAllClasses}
                          />
                          <p className="flex-1">
                            {t("_unpublished_picture._class")}
                          </p>
                        </div>
                      </th>
                      <th className="p-2 w-3/12 lg:w-2/12">
                        {t("_unpublished_picture._upload")}
                      </th>
                      <th className="p-2 w-3/12 lg:w-2/12">
                        {t("_unpublished_picture._ai_tagging")}
                      </th>
                      <th className="p-2 w-3/12 lg:w-2/12">
                        {t("_unpublished_picture._checked")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((c) => (
                      <tr key={c.id}>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Checkbox
                              name={c.id.toString()}
                              label={""}
                              isChecked={
                                selectedClasses.find((cl) => cl.id === c.id) !==
                                undefined
                              }
                              onChange={(status) => selectClass(status, c)}
                            />
                            <Link
                              to={`${UNPUBLISHED_PICTURES_PATH}/${c.id}`}
                              className="flex-1 underline"
                            >
                              {c.name}
                            </Link>
                          </div>
                        </td>
                        <td colSpan={3}>
                          <UploadPictureStatus
                            isUploaded={c.is_picture_uploaded}
                            isAIChecked={c.is_ai_completed}
                            remainingUncheckedAIPictures={c.remain_ai_picture}
                            isAllPicturesChecked={c.is_all_checked}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </Container>
      </div>
      {!loading && classes.length > 0 && (
        <PrimaryActionButton
          label={t("_unpublished_picture._publish")}
          disabled={selectedClasses.length === 0}
          onClick={() => setIsOpenPublishDialog(true)}
        />
      )}
      {isOpenPublishDialog && (
        <PictureStatusDialog
          classes={selectedClasses}
          onNoClick={() => setIsOpenPublishDialog(false)}
          onYesClick={() => {
            setSelectedClasses([]);
            setIsOpenPublishDialog(false);
          }}
        />
      )}
    </div>
  );
};

export default Summarization;
