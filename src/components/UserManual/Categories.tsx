import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SupportedLang } from "config/constants";
import type { UserManual } from "types/SupportMaterial";

interface CategoriesProps {
  manuals: UserManual[];
  onSelect: (categoryId: number) => void;
}

const Categories: FC<CategoriesProps> = ({ manuals, onSelect }) => {
  const { i18n } = useTranslation();
  const [categories, setCategories] = useState<UserManual[]>([]);

  useEffect(() => {
    const temp: { [key: string]: UserManual } = {};
    for (let manual of manuals) {
      if (!temp[manual.category_id]) temp[manual.category_id] = manual;
    }
    const categories = [];
    for (let key of Object.keys(temp)) {
      categories.push(temp[key]);
    }
    setCategories(categories);
  }, [manuals]);

  return (
    <div className="w-full h-full grid grid-cols-2 gap-2 lg:gap-10">
      {categories.map((category, i) => {
        return (
          <button
            key={i}
            className="w-full h-full bg-white border border-primary rounded-lg flex flex-col justify-center"
            onClick={() => onSelect(category.category_id)}
          >
            <h2 className="w-full text-xl lg:text-3xl font-bold text-center">
              {i18n.language === SupportedLang.ja
                ? category.category_ja
                : category.category_en}
            </h2>
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
