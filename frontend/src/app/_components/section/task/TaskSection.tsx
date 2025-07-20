import { useGetAllTasksForTheUserQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import ErrorFetchingData from "../../common/ErrorFetchingData";
import TitleOfSection from "../../common/TitleOfSection";
import { useFilterSelector } from "@/app/hooks/Selectors";
import { TaskCard } from "../../cards/TaskCard";
import { Task } from "@/app/types/Tasks";
import NoData from "../../common/NoData";
import { TaskCardLoader } from "../../loaders/TaskCardLoader";

const TaskSection = () => {
  const filter = useFilterSelector();
  const { data, isLoading, isError } = useGetAllTasksForTheUserQuery({
    subjectId: filter.subjectId ?? undefined,
  });

  if (isError) return <ErrorFetchingData />;

  const tasks = data?.data?.data ?? [];

  return (
    <section className="py-10 px-4 md:px-10">
      <TitleOfSection title="Your Tasks" />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <TaskCardLoader key={i} />
          ))}
        </div>
      ) : tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              subjectName={task.subject.name}
              startDate={task.startDate}
              endDate={task.endDate}
              createdAt={task.createdAt}
              creatorName={task.creator.name as string}
            />
          ))}
        </div>
      ) : (
        <NoData message="No tasks found." />
      )}
    </section>
  );
};
export { TaskSection };
