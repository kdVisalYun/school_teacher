import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import Papa from "papaparse";
import { convert } from "encoding-japanese";
import { isFulfilled } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import DownloadIcon from "assets/icons/DownloadIcon";
import UploadPhotoIcon from "assets/icons/UploadPhotoIcon";
import ClassDropdown from "components/__reusable/ClassDropdown";
import LoadingDialog from "components/__reusable/LoadingDialog";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { createMultipleStudents } from "features/student/studentAction";
import { StudentFormData } from "types/Student";
import Container from "components/__reusable/Container";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";
import { calculateGraduateDate } from "utilities/GraduateDateCalculator";

const BatchCreateForm = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { loading } = useAppSelector((state) => state.student);
  const [classId, setClassId] = useState("");

  useEffect(() => {
    if (!params.classId) return;
    setClassId(params.classId);
  }, [params]);

  const uploadFile = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target) return;
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const codes = new Uint8Array(arrayBuffer);
      const unicodeCodeList = convert(codes, "UNICODE", "SJIS");
      let unicodeString = "";
      for (let unicode of unicodeCodeList) {
        unicodeString += String.fromCharCode(unicode);
      }
      Papa.parse(unicodeString, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const parseData = result.data.filter((_, i) => i > 0);
          create(parseData as { [key: string]: string }[]);
        },
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const dispatch = useAppDispatch();
  const create = async (data: { [key: string]: string }[]) => {
    if (classId.length === 0) {
      dispatch(setErrorStatus(""));
      return;
    }

    const studentFormData = [];
    for (let entry of data) {
      const birthday = entry["生年月日"];
      const formattedBirthday = `${birthday.slice(0, 4)}-${birthday.slice(
        4,
        6
      )}-${birthday.slice(6, 8)}`;
      const graduateDate = calculateGraduateDate(new Date(formattedBirthday));
      const formData: StudentFormData = {
        last_name: entry["名字"],
        first_name: entry["名前"],
        last_name_kata: entry["名字（カナ）"],
        first_name_kata: entry["名前（カナ）"],
        class_id: classId,
        birthday: formattedBirthday,
        graduation_date: format(graduateDate, "yyyy-MM-dd"),
        is_ng: false,
      };
      studentFormData.push(formData);
    }
    const createAction = await dispatch(
      createMultipleStudents({ formData: studentFormData })
    );
    if (isFulfilled(createAction)) {
      dispatch(
        setSuccessStatus({
          title: "_student_form._loading_complete",
          message: t("_student_form._loading_complete_content", {
            total: data.length,
          }),
        })
      );
      setClassId("");
    } else {
      dispatch(
        setSuccessStatus({
          title: "_student_form._file_error",
          message: "_student_form._file_error_content",
        })
      );
    }
  };

  const downloadDocumentTemplate = () => {
    const csvData =
      '"名字","名前","名字（カナ）","名前（カナ）","生年月日"\n"＃山田","＃太郎","＃ヤマダ","＃タロウ","＃20231005"';
    const unicodeList = [];
    for (let i = 0; i < csvData.length; i += 1) {
      unicodeList.push(csvData.charCodeAt(i));
    }
    const shiftJisCodeList = convert(unicodeList, "SJIS", "UNICODE");
    const uInt8List = new Uint8Array(shiftJisCodeList);
    const blob = new Blob([uInt8List], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "template.csv";
    link.click();
  };

  return (
    <Container>
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="lg:flex items-center space-y-3 lg:space-x-3 lg:space-y-0">
            <h3 className="lg:w-1/4 font-medium">{`${t(
              "_student_form._class_name"
            )}(*)`}</h3>
            <ClassDropdown
              currentClassId={classId}
              onChange={(value) => setClassId(value.toString())}
            />
          </div>
          <div className="w-full bg-[#F4F4F4] px-3 py-2 flex flex-row justify-between items-center space-x-2 rounded-md">
            <div className="p-1 border-2 border-[#A0A0A0] border-dashed rounded-lg">
              <UploadPhotoIcon width={32} height={32} color={"#767676"} />
            </div>
            <p className="flex-1 text-sm lg:text-base">
              {t("_student_form._please_upload_file")}
            </p>
            <div className="flex items-stretch space-x-3">
              <button
                className="p-2 rounded-md text-primary border border-primary flex justify-start items-center space-x-3"
                onClick={downloadDocumentTemplate}
              >
                <p>{t("_student_form._download_template")}</p>
                <DownloadIcon width={24} height={24} color={"#00a09b"} />
              </button>
              <label htmlFor="upload" className="cursor-pointer">
                <div
                  className={
                    "block p-2 rounded-md text-base text-white bg-primary cursor-pointer"
                  }
                >
                  {t("_student_form._open")}
                </div>
                <input
                  type="file"
                  multiple={false}
                  accept={".csv"}
                  id="upload"
                  style={{ display: "none" }}
                  onChange={(e) => uploadFile(e.target.files)}
                  onClick={(e: any) => (e.target.value = null)}
                ></input>
              </label>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold underline">
            {t("_student_form._data_entry_note")}
          </h3>
          <p>
            <Trans i18nKey={"_student_form._enter_row"}>
              2行目のサンプルデータにならって
              <span className="text-[#ff0000] text-xl font-semibold">
                ３行目から
              </span>
              入力してください（#は不要です）。
            </Trans>
          </p>
          <p>{t("_student_form._class_name_note")}</p>
          <img className="w-3/4" alt="sample" src="/images/csv_sample.png" />
        </div>
      </div>
      {loading && <LoadingDialog />}
    </Container>
  );
};

export default BatchCreateForm;
