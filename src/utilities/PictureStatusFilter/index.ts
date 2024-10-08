import type { Picture } from "types/Pictures";

const getPublishablePicture = (pictures: Picture[]) => {
  const publishablePictures = pictures.filter(
    (picture) => picture.public_status === 1 && picture.is_taged
  );
  return publishablePictures;
};

const notTaggedByAICondition = (picture: Picture) =>
  picture.picture_type === 1 &&
  !picture.is_taged_by_ai &&
  picture.job_status === 2 &&
  picture.public_status === 0;
const removeTaggedByAICondition = (picture: Picture) =>
  picture.picture_type === 1 &&
  picture.is_taged_by_ai &&
  !picture.is_taged &&
  picture.job_status === 2;
const setToUnpublishedCondition = (picture: Picture) =>
  picture.public_status === 2;

const getUnpublishablePicture = (pictures: Picture[]) => {
  const unpublishablePictures = pictures.filter(
    (picture) =>
      setToUnpublishedCondition(picture) ||
      notTaggedByAICondition(picture) ||
      removeTaggedByAICondition(picture)
  );
  return unpublishablePictures;
};

const getNotTaggedByAIPicture = (pictures: Picture[]) => {
  return pictures.filter((picture) => notTaggedByAICondition(picture));
};

const getAIPictureToBeChecked = (pictures: Picture[]) => {
  return pictures.filter(
    (picture) =>
      picture.picture_type === 1 &&
      picture.is_taged &&
      picture.public_status < 2
  );
};

const getInProgressAIPicture = (pictures: Picture[]) => {
  return pictures.filter(
    (picture) =>
      picture.picture_type === 1 &&
      picture.job_status < 2 &&
      picture.public_status < 2
  );
};

const getNonAIPictureToBeChecked = (pictures: Picture[]) => {
  return pictures.filter(
    (picture) =>
      picture.picture_type > 1 &&
      picture.picture_type < 4 &&
      picture.public_status < 2
  );
};

export {
  getPublishablePicture,
  getUnpublishablePicture,
  getNotTaggedByAIPicture,
  getAIPictureToBeChecked,
  getInProgressAIPicture,
  getNonAIPictureToBeChecked,
};
