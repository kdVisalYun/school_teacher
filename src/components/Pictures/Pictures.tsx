import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import PictureSearchInput from "components/__reusable/PictureSearchInput";
import Container from "components/__reusable/Container";
import PictureThumbnail from "components/__reusable/PictureThumbnail";
import Pagination from "components/__reusable/Pagination";
import LoadingDialog from "components/__reusable/LoadingDialog";
import PictureDialog from "./PictureDialog";
import { getPublishedPictures } from "services/pictureServices";
import type { Picture } from "types/Pictures";
import { PICTURE_PAGE_SIZE } from "config/constants";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { setPictures, resetPicture } from "features/picture/pictureSlice";

const Pictures = () => {
  const { t } = useTranslation();
  const { pictures } = useAppSelector((state) => state.picture);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewIndex, setViewIndex] = useState(-1);

  const dispatch = useAppDispatch();
  const fetchPictures = async (page: number) => {
    setLoading(true);
    dispatch(resetPicture());
    try {
      const pictures = await getPublishedPictures(page + 1);
      dispatch(setPictures({ pictures: pictures.results }));
      setTotal(pictures.count);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPictures(page);
  }, [page]);

  const refetchPictures = async () => {
    setPage(0);
    await fetchPictures(0);
  };

  const renderThumbnail = (picture: Picture) => (
    <button
      key={picture.id}
      className="w-16 h-16 me-3 mb-3 cursor-pointer"
      onClick={() =>
        picture.thumbnail_picture ? viewPicture(picture.id) : null
      }
    >
      <PictureThumbnail imageSrc={picture.thumbnail_picture} name="picture" />
    </button>
  );

  const viewPicture = (pictureId: number) => {
    if (!pictures) return;
    const index = pictures.findIndex((picture) => picture.id === pictureId);
    setViewIndex(index);
  };
  const viewPreviousPicture = () => {
    if (!pictures) return;
    let index = viewIndex;
    if (index === 0) return;
    index--;
    setViewIndex(index);
  };
  const viewNextPicture = () => {
    if (!pictures) return;
    let index = viewIndex;
    if (index === pictures.length - 1) return;
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
    <div className="h-full w-full flex flex-col space-y-1 lg:space-y-3">
      <div>
        <PictureSearchInput onSearch={refetchPictures} />
      </div>
      <div className="flex-1 flex flex-col space-y-1 lg:space-y-2">
        {pictures && (
          <div className="lg:flex lg:justify-between lg:items-center">
            {total >= 1000 && (
              <p className="text-[#ff0000]">
                {t("_published_picture._large_data_warning")}
              </p>
            )}
            <p>
              {t("_published_picture._total_result")}
              {total || 0}
            </p>
          </div>
        )}
        <div className="flex-1">
          <Container>
            <div className="h-full overflow-auto relative">
              <div className="w-full h-full absolute">
                {loading && <LoadingDialog />}
                {pictures && (
                  <div className="flex flex-wrap">
                    {pictures.length === 0 && <p>{t("_generic._no_data")}</p>}
                    {pictures.map((picture) => renderThumbnail(picture))}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
        {pictures && total > PICTURE_PAGE_SIZE && (
          <Pagination
            currentPage={page}
            pageSize={PICTURE_PAGE_SIZE}
            totalItems={total}
            onChangePage={(page) => setPage(page)}
          />
        )}
      </div>
      {viewIndex >= 0 && pictures[viewIndex] && (
        <PictureDialog
          picture={pictures[viewIndex]}
          onPrevious={viewIndex > 0 ? () => viewPreviousPicture() : null}
          onNext={
            viewIndex < pictures.length - 1 ? () => viewNextPicture() : null
          }
          onClose={() => setViewIndex(-1)}
        />
      )}
    </div>
  );
};

export default Pictures;
