import { Subject } from "./Subject";
import { User } from "./User";

export type Quiz = {
  id: number;
  title: string;
  subject: Subject;
  creator: User;
  startDate: string | Date;
  duration: number; // minutes
};
