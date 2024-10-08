import React, { useRef, useEffect } from "react";

import CancelIcon from "assets/icons/CancelIcon";
import type { TagStudent } from "types/TagStudent";
import type { Student } from "types/Student";

interface TaggedStudentLabelProps {
  tagStudent: TagStudent;
  student: Student | undefined;
  containerWidth: number;
  containerHeight: number;
  pictureWidth: number;
  pictureHeight: number;
  onRemoveTag: (id: number) => void;
}

const TaggedStudentLabel: React.FC<TaggedStudentLabelProps> = ({
  tagStudent,
  student,
  containerWidth,
  containerHeight,
  pictureWidth,
  pictureHeight,
  onRemoveTag,
}) => {
  const lableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!lableRef.current) return;

    const parent = lableRef.current.parentNode as HTMLDivElement;
    if (!parent) return;
    const { width, height } = parent.getBoundingClientRect();
    const x = parent.offsetLeft; // position relative to parent
    const y = parent.offsetTop; // position relative to parent

    let rightDistance = 0;
    const right = width + x;
    if (right > containerWidth) {
      const temp = containerWidth - right;
      // less translate distance, result in overflow image
      if (temp < -100) {
        rightDistance = temp;
      } else {
        rightDistance = -100;
      }
    }

    let bottomDistance = 0;
    const bottom = height + y;
    if (bottom > pictureHeight) {
      bottomDistance = pictureHeight - bottom;
    }

    parent.style.transform = `translate(${rightDistance}px, ${bottomDistance}px)`;
  }, [lableRef.current]);

  return (
    <div
      key={tagStudent.id}
      style={{
        width: "max-content",
        position: "absolute",
        transform: "translate(0%, 0%)",
        top:
          tagStudent.axis_y < 0
            ? undefined
            : (tagStudent.axis_y * containerHeight) / pictureHeight,
        bottom:
          tagStudent.axis_y > 0
            ? undefined
            : -((tagStudent.axis_y * containerHeight) / pictureHeight),
        left:
          tagStudent.axis_x < 0
            ? undefined
            : (tagStudent.axis_x * containerWidth) / pictureWidth,
        right:
          tagStudent.axis_x > 0
            ? undefined
            : -((tagStudent.axis_x * containerWidth) / pictureWidth),
        zIndex: 100,
      }}
    >
      <div
        ref={lableRef}
        className="w-fit h-fit bg-black/50 rounded-full m-1.5 px-3 flex justify-between items-center lg:space-x-3 pointer-events-auto"
      >
        <p className="text-xs lg:text-base text-white">
          {student && `${student.last_name} ${student.first_name}`}
        </p>
        <button onClick={() => onRemoveTag(tagStudent.id)}>
          <CancelIcon width={20} height={20} color={"white"} />
        </button>
      </div>
    </div>
  );
};

export default TaggedStudentLabel;
