import { FC, useEffect, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";

import Container from "components/__reusable/Container";
import AccordionItem from "components/__reusable/AccordionItem";
import { SupportedLang } from "config/constants";
import type { FAQ } from "types/SupportMaterial";

interface SubcategoryProp {
  faqs: FAQ[];
}

const Subcategory: FC<SubcategoryProp> = ({ faqs }) => {
  const { i18n } = useTranslation();
  const [faqCategories, setFaqCategories] = useState<number[]>([]);
  const [previewFaq, setPreviewFaq] = useState<{ [key: string]: FAQ[] }>({});

  useEffect(() => {
    const categories = [];
    const previewFaq: { [key: string]: FAQ[] } = {};
    for (let faq of faqs) {
      if (!previewFaq[faq.sub_category_id]) {
        previewFaq[faq.sub_category_id] = [faq];
        categories.push(faq.sub_category_id);
        continue;
      } else {
        previewFaq[faq.sub_category_id].push(faq);
      }
    }
    setPreviewFaq(previewFaq);
    setFaqCategories(categories);
  }, [faqs]);

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">
        {i18n.language === SupportedLang.ja
          ? faqs[0].category_ja
          : faqs[0].category_en}
      </h2>
      {faqCategories.map((category) => (
        <div className="flex-1">
          <Container>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">
                {i18n.language === SupportedLang.ja
                  ? previewFaq[category][0].sub_category_ja
                  : previewFaq[category][0].sub_category_en}
              </h3>
              <div className="space-y-1">
                {previewFaq[category].map((faq) => (
                  <AccordionItem
                    titleElement={
                      <h4>
                        {i18n.language === SupportedLang.ja
                          ? faq.question_ja
                          : faq.question_en}
                      </h4>
                    }
                    contentElement={
                      <p
                        className="p-2 text-lg text-[#707070] text-wrap"
                        dangerouslySetInnerHTML={{
                          __html:
                            i18n.language === SupportedLang.ja
                              ? faq.answer_ja
                              : faq.answer_en,
                        }}
                      ></p>
                    }
                  />
                ))}
              </div>
            </div>
          </Container>
        </div>
      ))}
    </div>
  );
};

export default Subcategory;
