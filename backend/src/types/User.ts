import { Roles, CommunityRoles, Grades, Specializations } from "./enums.js";
export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
  community?: string;
  communityRole?: CommunityRoles;
  image?: string;
  grade: Grades;
  role: Roles;
  specialization?: Specializations;
  createdAt?: Date;
  updatedAt?: Date;
};
