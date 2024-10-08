import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import BackButton from "components/__reusable/BackButton";
import Container from "components/__reusable/Container";
import LoadingDialog from "components/__reusable/LoadingDialog";
import useAppDispatch from "hooks/useAppDispatch";
import { setErrorStatus } from "features/error/errorSlice";
import { getMaterialForParents } from "services/supportMaterialServices";
import { SupportedLang } from "config/constants";
import type { ParentsMaterial } from "types/SupportMaterial";

const ParentsMaterialPage = () => {
  const { t, i18n } = useTranslation();
  const [materials, setMaterials] = useState<ParentsMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const getMaterials = async () => {
    setIsLoading(true);
    try {
      const materials = await getMaterialForParents();
      setMaterials(materials);
    } catch (e) {
      dispatch(setErrorStatus(""));
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getMaterials();
  }, []);

  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton />
      <Container>
        <div className="space-y-2">
          <p className="text-xl font-bold">
            {t("_parents_material._for_new_user")}
          </p>
          {isLoading && <LoadingDialog />}
          <ul className="mx-10 space-y-1">
            {materials.map((material, i) => (
              <li key={i} className="list-disc">
                <a
                  className="text-lg underline text-primary font-semibold"
                  href={material.url}
                  target="_blank"
                >
                  {i18n.language === SupportedLang.ja
                    ? material.title_ja
                    : material.title_en}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default ParentsMaterialPage;
