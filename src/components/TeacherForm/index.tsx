import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BackButton from "components/__reusable/BackButton";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import { NEW } from "config/keywords";
import useIsPrincipal from "hooks/useIsPrincipal";
import { BASE_PATH } from "router/pathName";

const TeacherFormPage = () => {
  const navigate = useNavigate();
  const isPrincipal = useIsPrincipal();
  useEffect(() => {
    if (isPrincipal !== undefined && !isPrincipal)
      navigate(BASE_PATH, { replace: true });
  }, [isPrincipal]);

  const { id } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setIsUpdate(id !== NEW);
  }, [id]);

  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton />
      {isUpdate ? <UpdateForm /> : <CreateForm />}
    </section>
  );
};

export default TeacherFormPage;
