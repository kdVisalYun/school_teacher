import type { User } from "./User";

export type Facility = {
  address: string;
  city: string;
  code: string;
  create_time: string;
  email: string;
  id: number;
  name: string;
  owner_name: string;
  phone: string;
  postal_code: string;
  prefecture: string;
  type: number;
};

export type FacilityFormInputData = {
  facility: Facility | null;
  principal: User | null;
};

export type FacilityFormInfo = {
  email: string;
};

export type PrincipalFormInfo = {
  first_name: string;
  last_name: string;
  first_name_kata: string;
  last_name_kata: string;
};
