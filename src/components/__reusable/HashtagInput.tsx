import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

import { searchHashTag, getHashTagById } from "services/pictureServices";
import type { ActivityTag } from "types/ActivityTag";

interface HashtagInputProp {
  inputValue: string;
  onInputChange: (value: string) => void;
  value: number | null;
  onChange: (value: number | null) => void;
}

const HashtagInput: React.FC<HashtagInputProp> = ({
  inputValue,
  onInputChange,
  value,
  onChange,
}) => {
  const { t } = useTranslation();
  const [suggestion, setSuggestion] = useState<ActivityTag[]>([]);

  const getHashtag = async () => {
    try {
      const hashtag = await getHashTagById(value || 0);
      onInputChange(hashtag.name);
    } catch (e) {}
  };
  useEffect(() => {
    if (!value) return;
    getHashtag();
  }, [value]);

  const search = useCallback(
    debounce(async (query: string) => {
      try {
        const tags = await searchHashTag(query);
        setSuggestion(tags);
      } catch (e) {}
    }, 300),
    []
  );
  useEffect(() => {
    if (inputValue.length === 0 || value) {
      setSuggestion([]);
      return;
    }
    search(inputValue);
  }, [inputValue, search]);

  return (
    <div className="w-full space-y-1 relative">
      <div className="w-full p-3 rounded-lg border border-[#9B9B9B] bg-white space-y-1">
        <p>{t("_published_picture._include_activity_tags")}</p>
        <input
          className="w-full outline-none disabled:bg-white/50"
          name={"hashtag"}
          placeholder={"#"}
          autoComplete="off"
          value={`#${inputValue}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value.replace("#", "");
            if (newValue.includes(" ") || newValue.includes("#")) return;
            onInputChange(newValue);
            onChange(null);
          }}
        />
      </div>
      {suggestion.length > 0 && (
        <ul className="w-full bg-white rounded-lg p-2 max-h-36 overflow-auto absolute z-40 list-none">
          {suggestion.map((s) => (
            <li
              key={s.id}
              className="p-2 cursor-pointer hover:bg-[#F4F4F4]"
              onClick={() => {
                onChange(s.id);
                setSuggestion([]);
              }}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HashtagInput;
