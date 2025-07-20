import { Subject } from "./Subject";
import { User } from "./User";

export type Task = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  subject: Subject;
  creator:
    | User
    | {
        id: number;
        name: string;
      };
  createdAt: string;
  updatedAt: string;
};
