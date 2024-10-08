import React, { useState, ReactNode, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";

import TextInput from "components/__reusable/TextInput";
import type { FacilityFormInputData } from "types/Facility";
import {
  LICENSED_SCHOOL_LABEL,
  AUTHORIZED_SCHOOL_LABEL,
  SMALL_SCHOOL_LABEL,
  NONLICENSED_SCHOOL_LABEL,
  KINDERGARTEN_LABEL,
  COMPANY_LED_SCHOOL_LABEL,
  AFTERSCHOOL_SCHOOL_LABEL,
  ELEMENTARY_SCHOOL_LABEL,
  CRAM_SCHOOL_LABEL,
  LEISURE_SCHOOL_LABEL,
  MIDDLE_SCHOOL_LABEL,
  OTHER_SCHOOL_LABEL,
} from "config/keywords";
import {
  LICENSED_SCHOOL_VALUE,
  AUTHORIZED_SCHOOL_VALUE,
  SMALL_SCHOOL_VALUE,
  NONLICENSED_SCHOOL_VALUE,
  KINDERGARTEN_VALUE,
  COMPANY_LED_SCHOOL_VALUE,
  AFTERSCHOOL_SCHOOL_VALUE,
  ELEMENTARY_SCHOOL_VALUE,
  CRAM_SCHOOL_VALUE,
  LEISURE_SCHOOL_VALUE,
  MIDDLE_SCHOOL_VALUE,
  OTHER_SCHOOL_VALUE,
} from "config/constants";

interface InputGroupProps {
  isDisable: boolean;
  data: FacilityFormInputData;
}

const FACILITY_TYPES = [
  { value: LICENSED_SCHOOL_VALUE, label: LICENSED_SCHOOL_LABEL },
  { value: AUTHORIZED_SCHOOL_VALUE, label: AUTHORIZED_SCHOOL_LABEL },
  { value: SMALL_SCHOOL_VALUE, label: SMALL_SCHOOL_LABEL },
  { value: NONLICENSED_SCHOOL_VALUE, label: NONLICENSED_SCHOOL_LABEL },
  { value: KINDERGARTEN_VALUE, label: KINDERGARTEN_LABEL },
  { value: COMPANY_LED_SCHOOL_VALUE, label: COMPANY_LED_SCHOOL_LABEL },
  { value: AFTERSCHOOL_SCHOOL_VALUE, label: AFTERSCHOOL_SCHOOL_LABEL },
  { value: ELEMENTARY_SCHOOL_VALUE, label: ELEMENTARY_SCHOOL_LABEL },
  { value: CRAM_SCHOOL_VALUE, label: CRAM_SCHOOL_LABEL },
  { value: LEISURE_SCHOOL_VALUE, label: LEISURE_SCHOOL_LABEL },
  { value: MIDDLE_SCHOOL_VALUE, label: MIDDLE_SCHOOL_LABEL },
  { value: OTHER_SCHOOL_VALUE, label: OTHER_SCHOOL_LABEL },
];

const InputGroup: React.FC<InputGroupProps> = ({ isDisable, data }) => {
  const { t } = useTranslation();

  const [ownerName, setOwnerName] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(0);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastNameKana, setLastNameKana] = useState("");
  const [firstNameKana, setFirstNameKana] = useState("");

  useEffect(() => {
    setOwnerName(data.facility?.owner_name || "");
    setName(data.facility?.name || "");
    setCode(data.facility?.code || "");
    setPostalCode(data.facility?.postal_code || "");
    setPrefecture(data.facility?.prefecture || "");
    setCity(data.facility?.city || "");
    setPhone(data.facility?.phone || "");
    setEmail(data.facility?.email || "");
    setType(data.facility?.type || 0);
    setFirstName(data.principal?.first_name || "");
    setLastName(data.principal?.last_name || "");
    setFirstNameKana(data.principal?.first_name_kata || "");
    setLastNameKana(data.principal?.last_name_kata || "");
  }, [data]);

  const renderInput = (label: string, inputElement: ReactNode) => (
    <div className="lg:flex items-center space-y-1 lg:space-x-3 lg:space-y-0">
      <h3 className="lg:w-1/4 font-medium">{label}</h3>
      <div className="lg:w-3/4">{inputElement}</div>
    </div>
  );

  const renderFacilityTypeRadioButton = () => (
    <div className="w-full flex flex-wrap">
      {FACILITY_TYPES.map((facilityType) => (
        <div key={facilityType.value} className="space-x-2 my-1 w-1/2 lg:w-1/4">
          <input
            type="radio"
            id={facilityType.value.toString()}
            name={"type"}
            value={facilityType.value.toString()}
            checked={facilityType.value === type}
            onChange={() => {}}
            disabled={true}
          />
          <label htmlFor={facilityType.value.toString()}>
            {t(facilityType.label)}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <Fragment>
      {renderInput(
        t("_facility_form._plan"),
        <TextInput
          name={"plan"}
          placeholder={t("_facility_form._plan")}
          value={""}
          disabled={true}
          onChange={() => {}}
        />
      )}
      {renderInput(
        t("_facility_form._company_name"),
        <TextInput
          name={"owner_name"}
          placeholder={t("_facility_form._company_name")}
          value={ownerName}
          disabled={true}
          onChange={() => {}}
        />
      )}
      {renderInput(
        t("_facility_form._facility_name"),
        <TextInput
          name={"name"}
          placeholder={t("_facility_form._facility_name")}
          value={name}
          disabled={true}
          onChange={() => {}}
        />
      )}
      {renderInput(
        t("_facility_form._facility_id"),
        <TextInput
          name={"code"}
          placeholder={t("_facility_form._facility_id")}
          value={code}
          disabled={true}
          onChange={() => {}}
        />
      )}
      {renderInput(
        t("_facility_form._postal_code"),
        <TextInput
          name={"postal_code"}
          placeholder={"123-4567"}
          value={postalCode}
          disabled={true}
          onChange={() => {}}
        />
      )}
      {renderInput(
        t("_facility_form._prefecture"),
        <TextInput
          name={"prefecture"}
          placeholder={t("_facility_form._prefecture")}
          value={prefecture}
          disabled={true}
          onChange={() => {}}
        />
      )}
      {renderInput(
        t("_facility_form._municipality"),
        <TextInput
          name={"city"}
          placeholder={t("_facility_form._municipality")}
          value={city}
          disabled={true}
          onChange={() => {}}
        />
      )}
      {renderInput(
        t("_facility_form._telephone_number"),
        <TextInput
          name={"phone"}
          placeholder={"01-2345-6789"}
          value={phone}
          disabled={true}
          onChange={() => {}}
        />
      )}
      {renderInput(
        `${t("_facility_form._registered_email_address")} (*)`,
        <TextInput
          name={"email"}
          placeholder={t("_facility_form._registered_email_address")}
          value={email}
          disabled={isDisable}
          onChange={(value: string) => setEmail(value)}
        />
      )}
      {renderInput(
        `${t("_facility_form._principle_name")}(*)`,
        <div className="w-full space-y-1 lg:space-y-3">
          <div className="w-full flex space-x-3">
            <div className="w-1/2">
              <TextInput
                name={"last_name"}
                placeholder={t("_facility_form._last_name")}
                value={lastName}
                disabled={isDisable}
                onChange={(value: string) => setLastName(value)}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                name={"first_name"}
                placeholder={t("_facility_form._first_name")}
                value={firstName}
                disabled={isDisable}
                onChange={(value: string) => setFirstName(value)}
              />
            </div>
          </div>
          <div className="w-full flex space-x-3">
            <div className="w-1/2">
              <TextInput
                name={"last_name_kata"}
                placeholder={t("_facility_form._last_name_kana")}
                value={lastNameKana}
                disabled={isDisable}
                onChange={(value: string) => setLastNameKana(value)}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                name={"first_name_kata"}
                placeholder={t("_facility_form._first_name_kana")}
                value={firstNameKana}
                disabled={isDisable}
                onChange={(value: string) => setFirstNameKana(value)}
              />
            </div>
          </div>
        </div>
      )}
      {renderInput(
        t("_facility_form._facility_type"),
        renderFacilityTypeRadioButton()
      )}
    </Fragment>
  );
};

export default InputGroup;
