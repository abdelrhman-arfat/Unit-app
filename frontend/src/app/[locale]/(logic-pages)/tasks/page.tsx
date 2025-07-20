"use client";
import React from "react";

import { TaskSection } from "@/app/_components/section/task/TaskSection";
import UpdateSubjectId from "@/app/_components/Buttons/UpdateSubjectId";

const TasksPage = () => {
  return (
    <div>
      <UpdateSubjectId />
      <TaskSection />
    </div>
  );
};

export default TasksPage;
