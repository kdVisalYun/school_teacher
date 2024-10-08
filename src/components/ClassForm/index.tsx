import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BackButton from "components/__reusable/BackButton";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import { NEW } from "config/keywords";

const ClassFormPage = () => {
  const { id } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setIsUpdate(id !== NEW);
  }, [id]);

  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <BackButton />
      {!isUpdate ? <CreateForm /> : <UpdateForm />}
    </section>
  );
};

export default ClassFormPage;
