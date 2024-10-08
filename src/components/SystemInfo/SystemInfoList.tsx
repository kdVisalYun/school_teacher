import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Container from "components/__reusable/Container";
import LoadingDialog from "components/__reusable/LoadingDialog";
import SystemInfoListItem from "./SystemInfoListItem";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { getSystemInfo } from "features/systemInfo/systemInfoAction";

const SystemInfoList = () => {
  const { t } = useTranslation();
  const { systemInfo, loading } = useAppSelector((state) => state.systemInfo);

  const dispatch = useAppDispatch();
  const fetchSystemInfo = () => dispatch(getSystemInfo());
  const callFetchSystemInfo = useCallback(fetchSystemInfo, [
    dispatch,
    getSystemInfo,
  ]);
  useEffect(() => {
    callFetchSystemInfo();
  }, [callFetchSystemInfo]);

  return (
    <Container>
      <div className="h-full overflow-y-auto overflow-x-hidden relative">
        <div className="w-full h-full absolute">
          <div className="space-y-2 lg:space-y-3">
            {!loading && systemInfo.length === 0 && (
              <p>{t("_generic._no_data")}</p>
            )}
            {!loading &&
              systemInfo.length > 0 &&
              systemInfo.map((info) => (
                <SystemInfoListItem
                  key={info.id}
                  title={info.title}
                  startDate={new Date(info.view_start_time)}
                  memo={info.memo}
                />
              ))}
          </div>
        </div>
      </div>
      {loading && <LoadingDialog />}
    </Container>
  );
};

export default SystemInfoList;
