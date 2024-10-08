export type ParentsMaterial = {
  title_en: string;
  title_ja: string;
  url: string;
};

export type UserManual = {
  category_id: number;
  category_en: string;
  category_ja: string;
  title_en: string;
  title_ja: string;
  url: string;
};

export type FAQ = {
  category_id: number;
  category_ja: string;
  category_en: string;
  sub_category_id: number;
  sub_category_ja: string;
  sub_category_en: string;
  question_ja: string;
  question_en: string;
  answer_ja: string;
  answer_en: string;
};
