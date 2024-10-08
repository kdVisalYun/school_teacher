import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

import Container from "components/__reusable/Container";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { getSystemInfo } from "features/systemInfo/systemInfoAction";
import type { SystemInfo } from "types/SystemInfo";

const LatestSystemInfo = () => {
  const { t } = useTranslation();
  const { systemInfo } = useAppSelector((state) => state.systemInfo);

  const dispatch = useAppDispatch();
  const fetchSystemInfo = () => dispatch(getSystemInfo());
  const callFetchSystemInfo = useCallback(fetchSystemInfo, [
    dispatch,
    getSystemInfo,
  ]);
  useEffect(() => {
    callFetchSystemInfo();
  }, [callFetchSystemInfo]);

  const [latestSystemInfo, setLatestSystemInfo] = useState<SystemInfo | null>(
    null
  );
  useEffect(() => {
    if (systemInfo.length === 0) return;
    setLatestSystemInfo(systemInfo[0]);
  }, [systemInfo]);

  return latestSystemInfo ? (
    <div className="w-full">
      <Container>
        <div className="space-y-3">
          <h2 className="text-xl font-bold">{t("_home._notification")}</h2>
          <div className="w-full lg:flex text-lg space-x-1">
            <p className="text-primary">
              {format(new Date(latestSystemInfo.view_start_time), "yyyy.MM.dd")}
            </p>
            <button>
              <p className="font-semibold">{latestSystemInfo.title}</p>
            </button>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
};

export default LatestSystemInfo;
