import { useCallback, useEffect, useState, useRef, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { isFulfilled } from "@reduxjs/toolkit";

import Container from "components/__reusable/Container";
import InputGroup from "./InputGroup";
import SecondaryActionButton from "components/__reusable/SecondaryActionButton";
import PrimaryActionButton from "components/__reusable/PrimaryActionButton";
import LoadingDialog from "components/__reusable/LoadingDialog";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { getUserProfile } from "features/user/userAction";
import { updateFacilityAndPrincipal } from "features/facility/facilityAction";
import {
  FacilityFormInfo,
  FacilityFormInputData,
  PrincipalFormInfo,
} from "types/Facility";
import { setSuccessStatus } from "features/success/successSlice";
import { setErrorStatus } from "features/error/errorSlice";

const Form = () => {
  const { t } = useTranslation();
  const { facility, loading } = useAppSelector((state) => state.facility);

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const fetchUser = () => !user && dispatch(getUserProfile());
  const callFetchUser = useCallback(fetchUser, [dispatch, getUserProfile]);
  useEffect(() => {
    callFetchUser();
  }, [callFetchUser]);

  const [formData, setFormData] = useState<FacilityFormInputData>({
    facility: null,
    principal: null,
  });
  useEffect(() => {
    setFormData({ facility, principal: user });
  }, [facility, user]);

  const [isEdit, setIsEdit] = useState(false);
  const renderButton = () => {
    if (!isEdit) {
      return (
        <PrimaryActionButton
          label={t("_facility_form._edit")}
          onClick={() => setIsEdit(true)}
        />
      );
    } else {
      return (
        <div className="flex space-x-5">
          <div className="w-1/2">
            <SecondaryActionButton
              label={t("_generic._cancel")}
              onClick={() => {
                setIsEdit(false);
                setFormData({ facility, principal: user });
              }}
            />
          </div>
          <div className="w-1/2">
            <PrimaryActionButton
              isButton={false}
              label={t("_facility_form._save")}
            />
          </div>
        </div>
      );
    }
  };

  const formElement = useRef<HTMLFormElement>(null);
  const update = async (e: FormEvent) => {
    e.preventDefault();
    if (!formElement.current) return;
    if (!facility) return;
    const formData = new FormData(formElement.current);
    const updateFacilityFormData: FacilityFormInfo = {
      email: formData.get("email") as string,
    };
    const updateUserFormData: PrincipalFormInfo = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      first_name_kata: formData.get("first_name_kata") as string,
      last_name_kata: formData.get("last_name_kata") as string,
    };
    const updateAction = await dispatch(
      updateFacilityAndPrincipal({
        id: facility.id,
        facilityFormData: updateFacilityFormData,
        principalFormData: updateUserFormData,
      })
    );
    if (isFulfilled(updateAction)) {
      dispatch(
        setSuccessStatus({
          title: "_facility_form._save_complete",
          message: "_facility_form._save_complete_content",
        })
      );
      setIsEdit(false);
    } else {
      dispatch(setErrorStatus(""));
    }
  };

  return (
    <Container>
      <div className="h-full overflow-auto relative">
        <div className="w-full h-full absolute">
          <form
            ref={formElement}
            className="space-y-3 lg:space-y-5"
            onSubmit={update}
          >
            <InputGroup data={formData} isDisable={!isEdit} />
            {renderButton()}
          </form>
        </div>
      </div>
      {loading && <LoadingDialog />}
    </Container>
  );
};

export default Form;
