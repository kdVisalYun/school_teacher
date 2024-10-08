import React, {
  useRef,
  MouseEvent,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";

import {
  getTagStudent,
  tagStudent as tag,
  removeStudentTag,
} from "services/pictureServices";
import TaggedStudentLabel from "./TaggedStudentLabel";
import StudentList from "./StudentList";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { getStudents } from "features/student/studentAction";
import { updatePictureTagStatus } from "features/picture/pictureSlice";
import { StudentSortValue, PicturePublishStatus } from "config/constants";
import type { Picture } from "types/Pictures";
import type { AddTagStudentFormData, TagStudent } from "types/TagStudent";
import type { Student } from "types/Student";
import { setErrorStatus } from "features/error/errorSlice";
import { updatePicturePublishStatus } from "features/picture/pictureAction";

interface TaggedStudentContainerProps {
  picture: Picture;
  isShowTag: boolean;
}

const TaggedStudentContainer: React.FC<TaggedStudentContainerProps> = ({
  picture,
  isShowTag,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [axisX, setAxisX] = useState(-1);
  const [axisY, setAxisY] = useState(-1);
  const getClickLocation = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).id !== "tag_container") return;
    const img = new Image();
    img.onload = function () {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left;
      x = (img.width * x) / rect.width;
      const axisX = x > 0 ? x : 0;
      setAxisX(axisX);

      let y = e.clientY - rect.top;
      y = (img.height * y) / rect.height;
      const axisY = y > 0 ? y : 0;
      setAxisY(axisY);
    };
    img.src = picture.converted_picture;
  };

  const [pictureWidth, setPictureWidth] = useState(1);
  const [pictureHeight, setPictureHeight] = useState(1);
  useEffect(() => {
    const img = new Image();
    img.onload = function () {
      setPictureWidth(img.width);
      setPictureHeight(img.height);
    };
    img.src = picture.converted_picture;
  }, [picture]);

  const { id } = useParams();
  const { students } = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();
  const fetchStudents = () =>
    (students.length === 0 || students[0]?.class_id !== parseInt(id || "")) &&
    dispatch(
      getStudents({
        classId: parseInt(id || ""),
        sortValue: StudentSortValue.name_asc,
      })
    );
  const callFetchStudents = useCallback(fetchStudents, [
    id,
    dispatch,
    getStudents,
  ]);
  useEffect(() => {
    callFetchStudents();
  }, [callFetchStudents]);

  const [tagStudents, setTagStudents] = useState<TagStudent[]>([]);
  const fetchTagStudent = async () => {
    try {
      const tagStudents = await getTagStudent(picture.id);
      setTagStudents(tagStudents);
    } catch (e) {
      dispatch(setErrorStatus(""));
    }
  };
  useEffect(() => {
    fetchTagStudent();
  }, [picture]);

  const tagStudent = async (student: Student) => {
    try {
      const formData: AddTagStudentFormData = {
        picture_id: picture.id,
        student_id: student.id,
        axis_x: Math.floor(axisX),
        axis_y: Math.floor(axisY),
        rate: 100,
      };
      const tagStudent = await tag(formData);
      if (tagStudents.length === 0) {
        dispatch(updatePictureTagStatus({ id: picture.id, isTagged: true }));
      }
      setTagStudents([...tagStudents, tagStudent]);
      setAxisX(-1);
      setAxisY(-1);
    } catch (e) {
      dispatch(setErrorStatus(""));
    }
  };

  const removeTag = async (id: number) => {
    try {
      await removeStudentTag(id);
      const temp = [...tagStudents];
      const index = temp.findIndex((t) => t.id === id);
      if (index >= 0) temp.splice(index, 1);
      if (temp.length === 0) {
        dispatch(updatePictureTagStatus({ id: picture.id, isTagged: false }));
        if (picture.is_taged_by_ai) {
          dispatch(
            updatePicturePublishStatus({
              id: picture.id,
              formData: { public_status: PicturePublishStatus.not_good },
            })
          );
        }
      }
      setTagStudents(temp);
    } catch (e) {
      dispatch(setErrorStatus(""));
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute top-0 left-0 z-10 pointer-events-auto"
    >
      <div
        id="tag_container"
        role="button"
        className="w-full h-full relative top-0 left-0"
        onClick={getClickLocation}
      >
        {isShowTag &&
          pictureWidth > 1 &&
          pictureHeight > 1 &&
          tagStudents.map((tagStudent) => (
            <TaggedStudentLabel
              tagStudent={tagStudent}
              student={students.find(
                (student) => student.id === tagStudent.student_id
              )}
              pictureHeight={pictureHeight}
              pictureWidth={pictureWidth}
              containerHeight={containerRef.current?.clientHeight || 0}
              containerWidth={containerRef.current?.clientWidth || 0}
              onRemoveTag={(id) => removeTag(id)}
            />
          ))}
      </div>
      {axisX > -1 && axisY > -1 && (
        <StudentList
          tagStudents={tagStudents}
          onSelect={(student) => tagStudent(student)}
          onClose={() => {
            setAxisX(-1);
            setAxisY(-1);
          }}
        />
      )}
    </div>
  );
};

export default TaggedStudentContainer;
