import { Subject } from "./Subject";
import { User } from "./User";

export type Quiz = {
  id: number;
  title: string;
  description: string;
  subjectId: number;
  subject: Subject;
  creator: User;
  startDate: string | Date;
  duration: number; // minutes
};
