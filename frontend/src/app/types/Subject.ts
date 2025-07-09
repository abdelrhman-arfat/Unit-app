import { grades } from "./grades";
import { specializations } from "./Specialization";

export type Subject = {
  id: number;
  name: string;
  specialization: specializations;
  grade: grades;
  createdAt: Date;
  updatedAt: Date;
};
