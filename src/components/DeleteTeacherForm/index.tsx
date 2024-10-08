import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "components/__reusable/BackButton";
import Form from "./Form";
import useIsPrincipal from "hooks/useIsPrincipal";
import { BASE_PATH } from "router/pathName";

const DeleteTeacherFormPage = () => {
  const navigate = useNavigate();
  const isPrincipal = useIsPrincipal();
  useEffect(() => {
    if (isPrincipal !== undefined && !isPrincipal)
      navigate(BASE_PATH, { replace: true });
  }, [isPrincipal]);

  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton />
      <Form />
    </section>
  );
};

export default DeleteTeacherFormPage;
