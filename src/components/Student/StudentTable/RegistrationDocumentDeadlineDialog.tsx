import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import useAppSelector from "hooks/useAppSelector";
import MessageDialog from "components/__reusable/MessageDialog";
import DateInput from "components/__reusable/DateInput";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import ParentsRegistrationLetters from "assets/lettersTemplate/ParentsRegistrationLetters";
import generatePdf from "utilities/PdfGenerator";

const DEFAULT_DATE = new Date();
DEFAULT_DATE.setMonth(DEFAULT_DATE.getMonth() + 1);
DEFAULT_DATE.setHours(23, 59, 59, 999);

const MIN_DATE = new Date();
MIN_DATE.setDate(MIN_DATE.getDate() + 1);

interface RegistrationDocumentDeadlineDialogProps {
  onYesClick: () => void;
  onNoClick: () => void;
}

const RegistrationDocumentDeadlineDialog: React.FC<
  RegistrationDocumentDeadlineDialogProps
> = ({ onNoClick, onYesClick }) => {
  const { t } = useTranslation();
  const [expiredDate, setExpiredDate] = useState(DEFAULT_DATE);

  const { selectedStudents } = useAppSelector((state) => state.student);
  const issueDocument = () => {
    let content = "";
    const expiryDateString = `${expiredDate.getFullYear()}-${(
      expiredDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${expiredDate.getDate().toString().padStart(2, "0")}`;
    for (let student of selectedStudents) {
      const studentName = `${student.last_name} ${student.first_name}`
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
      const studentActivateCode = JSON.stringify({
        activate_code: [student.activate_code],
        expiry_date: expiryDateString,
      });
      let qrCode = "";
      QRCode.toDataURL(studentActivateCode, (error, dataURL) => {
        if (error) {
          console.error("Error generating QR code:", error);
        } else {
          qrCode = dataURL;
        }
      });
      let htmlBody = ParentsRegistrationLetters.replaceAll(
        "{{student_name}}",
        studentName
      )
        .replaceAll("{{qrcode}}", qrCode)
        .replaceAll(
          "{{date}}",
          format(expiredDate, "yo Mo do", { locale: ja })
        );
      content += htmlBody;
    }
    generatePdf("保護者アプリ初回登録のご案内", "portrait", content);
    onYesClick();
  };

  return (
    <MessageDialog>
      <div className="space-y-3">
        <p>{t("_student._registration_deadline")}</p>
        <DateInput
          name={"expiredDate"}
          currentDate={expiredDate}
          minDate={MIN_DATE}
          onChange={(value) => setExpiredDate(value)}
        />
        <div className="flex justify-between items-center space-x-5 w-full">
          <div className="w-1/2">
            <SecondaryActionButton
              label={t("_generic._cancel")}
              onClick={onNoClick}
            />
          </div>
          <div className="w-1/2">
            <PrimaryActionButton
              label={t("_student._issue")}
              disabled={expiredDate < MIN_DATE}
              onClick={issueDocument}
            />
          </div>
        </div>
      </div>
    </MessageDialog>
  );
};

export default RegistrationDocumentDeadlineDialog;
