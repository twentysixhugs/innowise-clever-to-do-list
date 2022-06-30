import { Overview } from "../../components/Overview";
import { ITask } from "../../interfaces/task.interface";

interface ITasksOverviewProps {
  tasks: ITask[];
  onIsTaskCompletedChange: (id: string) => void;
}

export const TasksOverview = ({
  tasks,
  onIsTaskCompletedChange,
}: ITasksOverviewProps) => {
  return (
    <Overview tasks={tasks} onIsTaskCompletedChange={onIsTaskCompletedChange} />
  );
};
