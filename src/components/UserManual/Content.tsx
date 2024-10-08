import { FC } from "react";
import { useTranslation } from "react-i18next";

import Container from "components/__reusable/Container";
import type { UserManual } from "types/SupportMaterial";
import { SupportedLang } from "config/constants";

interface ContentProp {
  manuals: UserManual[];
}

const Content: FC<ContentProp> = ({ manuals }) => {
  const { i18n } = useTranslation();

  return (
    <Container>
      <div className="space-y-2">
        <p className="text-xl font-bold">
          {i18n.language === SupportedLang.ja
            ? manuals[0].category_ja
            : manuals[0].category_en}
        </p>
        <ul className="mx-10 space-y-1">
          {manuals.map((manual, i) => (
            <li key={i} className="list-disc">
              <a
                className="text-lg underline text-primary font-semibold"
                href={manual.url}
                target="_blank"
              >
                {i18n.language === SupportedLang.ja
                  ? manual.title_ja
                  : manual.title_en}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Content;
