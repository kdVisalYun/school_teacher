import { useEffect, useState } from "react";

import useAppSelector from "./useAppSelector";
import { PRINCIPAL } from "config/keywords";

export default function useIsPrincipal() {
  const [isPrincipal, setIsPrincipal] = useState<boolean | undefined>(
    undefined
  );
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    setIsPrincipal(user?.role === PRINCIPAL);
  }, [user]);

  return isPrincipal;
}
