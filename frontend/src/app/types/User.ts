import { grades } from "./grades";
import { roles } from "./roles";
import { specializations } from "./Specialization";

export type User = {
  id?: number;
  email?: string;
  name?: string;
  image?: string;
  communityRole?: string;
  communityName?: string;
  role?: roles;
  specialization?: specializations;
  grade?: grades;
};
