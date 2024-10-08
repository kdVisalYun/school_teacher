import { useEffect, useState } from "react";

import BackIcon from "assets/icons/BackIcon";
import { getFaq } from "services/supportMaterialServices";
import useAppDispatch from "hooks/useAppDispatch";
import { setErrorStatus } from "features/error/errorSlice";
import type { FAQ } from "types/SupportMaterial";
import LoadingDialog from "components/__reusable/LoadingDialog";
import Category from "./Category";
import Subcategory from "./Subcategory";

const FAQPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const fetchFaq = async () => {
    setIsLoading(true);
    try {
      const faqs = await getFaq();
      setFaqs(faqs);
    } catch (e) {
      dispatch(setErrorStatus(""));
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchFaq();
  }, []);

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(0);
      return;
    }
    window.history.back();
  };

  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <button
        className="w-fit p-2 rounded-full bg-white drop-shadow-[2px_2px_6px_rgba(0,0,0,0.1)]"
        onClick={handleBack}
      >
        <BackIcon width={32} height={32} color={"#000000"} />
      </button>
      {isLoading && <LoadingDialog />}
      {!selectedCategory ? (
        <Category
          faqs={faqs}
          onSelect={(categoryId) => setSelectedCategory(categoryId)}
        />
      ) : (
        <Subcategory
          faqs={faqs.filter((faq) => faq.category_id === selectedCategory)}
        />
      )}
    </section>
  );
};

export default FAQPage;
