import { grades } from "./grades";
import { roles } from "./roles";
import { specializations } from "./Specialization";

export type UserSearchFilter = {
  email?: string;
  role?: roles;
  specialization?: specializations;
  grade?: grades;
};
