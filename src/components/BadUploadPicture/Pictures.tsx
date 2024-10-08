import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ClassLabel from "./ClassLabel";
import Container from "components/__reusable/Container";
import PictureThumbnail from "components/__reusable/PictureThumbnail";
import PictureDialog from "components/UploadPicture/PictureDialog/PictureDialog";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { getUnpublishedPictures } from "features/picture/pictureAction";
import type { Picture } from "types/Pictures";
import { getUnpublishablePicture } from "utilities/PictureStatusFilter";
import { PicturePublishStatus } from "config/constants";

const Pictures = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { classes } = useAppSelector((state) => state.class);
  const dispatch = useAppDispatch();
  const fetchUnpublishedPictures = () => {
    if (isNaN(parseInt(id || ""))) return;
    const currentClass = classes.find((c) => c.id === parseInt(id || ""));
    if (!currentClass) return;
    currentClass &&
      dispatch(getUnpublishedPictures({ classId: currentClass.id }));
  };
  const callFetchUnpublishedPictures = useCallback(fetchUnpublishedPictures, [
    id,
    classes,
    dispatch,
    getUnpublishedPictures,
  ]);
  useEffect(() => {
    callFetchUnpublishedPictures();
  }, [callFetchUnpublishedPictures]);

  const { pictures } = useAppSelector((state) => state.picture);
  const [viewIndex, setViewIndex] = useState(-1);
  const [skip, setSkip] = useState(false);
  const [unpublishablePictures, setUnpublishablePictures] = useState<Picture[]>(
    []
  );
  const filterPicture = () => {
    setSkip(false);
    if (pictures.length === 0) {
      setUnpublishablePictures([]);
    }
    const updatedUnpublishablePictures = getUnpublishablePicture(pictures);

    if (viewIndex > -1) {
      if (updatedUnpublishablePictures.length === 0) {
        updatedUnpublishablePictures.push({
          ...unpublishablePictures[viewIndex],
          public_status: PicturePublishStatus.good,
        });
      } else if (
        unpublishablePictures[viewIndex].id !==
        updatedUnpublishablePictures[viewIndex]?.id
      ) {
        updatedUnpublishablePictures.splice(viewIndex, 0, {
          ...unpublishablePictures[viewIndex],
          public_status: PicturePublishStatus.good,
        });
        setSkip(true);
      }
    }
    setUnpublishablePictures(updatedUnpublishablePictures);
  };
  const removePicture = () => {
    const temp = [...unpublishablePictures];
    temp.splice(viewIndex, 1);
    setUnpublishablePictures(temp);
  };
  useEffect(() => {
    filterPicture();
  }, [pictures, viewIndex]);

  const viewPicture = (pictureId: number) => {
    if (!unpublishablePictures.length) return;
    const index = unpublishablePictures.findIndex(
      (picture) => picture.id === pictureId
    );
    setViewIndex(index);
  };
  const viewPreviousPicture = () => {
    if (skip) {
      removePicture();
    }
    let index = viewIndex;
    if (index === 0) return;
    index--;
    setViewIndex(index);
  };
  const viewNextPicture = () => {
    if (skip) {
      removePicture();
      return;
    }
    if (!unpublishablePictures.length) return;
    let index = viewIndex;
    if (index === unpublishablePictures.length - 1) return;
    index++;
    setViewIndex(index);
  };
  const handleKeyboardEvent = (e: KeyboardEvent) => {
    if (e.keyCode === 39) {
      //arrow right key
      viewNextPicture();
      return;
    }
    if (e.keyCode === 37) {
      //arrow left key
      viewPreviousPicture();
      return;
    }
  };
  useEffect(() => {
    window.removeEventListener("keyup", handleKeyboardEvent);
    window.addEventListener("keyup", handleKeyboardEvent);
    return () => {
      window.removeEventListener("keyup", handleKeyboardEvent);
    };
  }, [viewIndex]);

  return (
    <div className="h-full flex flex-col space-y-3 lg:space-y-5">
      <ClassLabel />
      <div className="flex-1">
        <Container>
          <div className="flex-1 h-full overflow-y-auto relative">
            <div className="w-full h-full absolute">
              <div className="flex flex-wrap">
                {unpublishablePictures.length === 0 ? (
                  <p>{t("_generic._no_data")}</p>
                ) : (
                  unpublishablePictures.map((picture) => (
                    <button
                      key={picture.id}
                      className="w-16 h-16 me-3 mb-3"
                      onClick={() =>
                        picture.thumbnail_picture
                          ? viewPicture(picture.id)
                          : null
                      }
                    >
                      <PictureThumbnail
                        imageSrc={picture.thumbnail_picture}
                        name="picture"
                      />
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
      {viewIndex > -1 && unpublishablePictures[viewIndex] !== undefined && (
        <PictureDialog
          picture={unpublishablePictures[viewIndex]}
          onPrevious={viewIndex > 0 ? () => viewPreviousPicture() : null}
          onNext={
            viewIndex < unpublishablePictures.length - 1
              ? () => viewNextPicture()
              : null
          }
          onClose={() => setViewIndex(-1)}
        />
      )}
    </div>
  );
};

export default Pictures;
