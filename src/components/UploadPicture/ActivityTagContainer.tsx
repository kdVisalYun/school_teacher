import React, { FormEvent, useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";

import CancelIcon from "assets/icons/CancelIcon";
import Container from "components/__reusable/Container";
import TextInput from "components/__reusable/TextInput";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import {
  getRecentlyUsedHashtags,
  addHashTag,
  removeHashTag,
  createNewHashTag,
  searchHashTag,
} from "services/pictureServices";
import type { ActivityTag } from "types/ActivityTag";
import { Picture } from "types/Pictures";
import useAppDispatch from "hooks/useAppDispatch";
import {
  addHashTag as add,
  removeHashTag as remove,
} from "features/picture/pictureSlice";
import LoadingDialog from "components/__reusable/LoadingDialog";
import { setErrorStatus } from "features/error/errorSlice";

interface ActivityTagContainerProp {
  pictures: Picture[];
}

const ActivityTagContainer: React.FC<ActivityTagContainerProp> = ({
  pictures,
}) => {
  const { t } = useTranslation();
  const [inputTag, setInputTag] = useState("");

  const [recentUsedTags, setRecentUsedTags] = useState<ActivityTag[]>([]);
  const getRecentTags = async () => {
    try {
      const hashtags = await getRecentlyUsedHashtags(5);
      setRecentUsedTags(hashtags.results);
    } catch (e) {}
  };
  useEffect(() => {
    getRecentTags();
  }, []);
  const renderRecentUsedTag = (tag: ActivityTag) => {
    return (
      <button
        key={tag.id}
        type="button"
        className="w-fit me-2 mb-2 py-1 px-2 border border-[#9B9B9B] rounded-full text-primary text-sm disabled:bg-gray-300"
        disabled={usedTags.find((t) => t.id === tag.id) !== undefined}
        onClick={() => addTag(tag)}
      >
        <p>#{tag.name}</p>
      </button>
    );
  };

  const [usedTags, setUsedTags] = useState<ActivityTag[]>([]);
  useEffect(() => {
    const activityTags: { [key: string]: ActivityTag } = {};
    for (let picture of pictures) {
      for (let hashtag of picture.hashtags_info) {
        if (!activityTags[hashtag.id]) activityTags[hashtag.id] = hashtag;
      }
    }
    const tags: ActivityTag[] = [];
    for (let key of Object.keys(activityTags)) {
      tags.push(activityTags[key]);
    }
    setUsedTags(tags);
  }, [pictures]);
  const renderedUsedTag = (tag: ActivityTag) => {
    return (
      <div
        key={tag.id}
        className="w-fit bg-white me-2 mb-2 py-1 px-2 border border-[#9B9B9B] rounded-full text-primary text-sm flex justify-between items-center lg:space-x-3"
      >
        <p>#{tag.name}</p>
        <button onClick={() => removeTag(tag)}>
          <CancelIcon width={20} height={20} color={"#9B9B9B"} />
        </button>
      </div>
    );
  };

  const createTag = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const existHashtag = await searchHashTag(inputTag);
      if (existHashtag[0]?.name === inputTag) {
        await addTag(existHashtag[0]);
        setInputTag("");
        return;
      }
      const tag = await createNewHashTag(inputTag);
      if (recentUsedTags.length < 5) {
        const temp = recentUsedTags;
        temp.push(tag);
        setRecentUsedTags(temp);
      }
      await addTag(tag);
      setInputTag("");
    } catch (e) {}
  };

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const addTag = async (hashTag: ActivityTag) => {
    setIsLoading(true);
    const pictureId = pictures.map((picture) => picture.id);
    try {
      await addHashTag(pictureId, hashTag.id);
      setUsedTags([...usedTags, hashTag]);
      for (let id of pictureId) {
        dispatch(add({ pictureId: id, hashTag }));
      }
    } catch (e) {
      dispatch(setErrorStatus(""));
    } finally {
      setIsLoading(false);
    }
  };

  const removeTag = async (hashTag: ActivityTag) => {
    setIsLoading(true);
    const pictureId = pictures.map((picture) => picture.id);
    try {
      await removeHashTag(pictureId, hashTag.id);
      setUsedTags(usedTags.filter((tag) => tag.id !== hashTag.id));
      for (let id of pictureId) {
        dispatch(remove({ pictureId: id, hashTagId: hashTag.id }));
      }
    } catch (e) {
      dispatch(setErrorStatus(""));
    } finally {
      setIsLoading(false);
    }
  };

  return pictures.length > 0 ? (
    <div className="h-fit">
      {isLoading && <LoadingDialog />}
      <Container>
        <div className="space-y-1">
          <h3 className="text-lg">
            <Trans i18nKey={"_unpublished_picture_class._activity_tag"}>
              活動タグ
              <span className="text-sm">※保護者アプリには表示されません</span>
            </Trans>
          </h3>
          <div className="h-0.5 bg-[#E7E5E0]"></div>
          <div className="space-y-1">
            <form className="space-y-1" onSubmit={createTag}>
              <div className="w-full flex space-x-1">
                <div className="flex-1">
                  <TextInput
                    name={"tags"}
                    placeholder={"#"}
                    value={`#${inputTag}`}
                    onChange={(value) => {
                      const newText = value.replace("#", "");
                      if (newText.includes(" ") || newText.includes("#"))
                        return;
                      setInputTag(newText);
                    }}
                  />
                </div>
                <div className="w-1/6">
                  <PrimaryActionButton
                    isButton={false}
                    disabled={inputTag.length === 0}
                    label={t("_unpublished_picture_class._activity_tag_add")}
                  />
                </div>
              </div>
              <div>
                <h4>
                  {t("_unpublished_picture_class._activity_tag_suggestion")}
                </h4>
                <div className="flex flex-wrap">
                  {recentUsedTags.map((tag) => renderRecentUsedTag(tag))}
                </div>
              </div>
            </form>
            {usedTags.length > 0 && (
              <div className="w-full bg-[#e7e6e6] p-1 rounded">
                <h4 className="font-semibold">
                  {t("_unpublished_picture_class._current_activity_tag")}
                </h4>
                <div className="flex flex-wrap">
                  {usedTags.map((tag) => renderedUsedTag(tag))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
};

export default ActivityTagContainer;
