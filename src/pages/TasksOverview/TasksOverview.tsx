import { Overview } from "../../components/Overview";
import { useTasks } from "../../context/TasksStore";

export const TasksOverview = () => {
  const { tasks, toggleTaskCompletion } = useTasks();

  const handleToggleTaskComplete = (id: string) => {
    toggleTaskCompletion(id);
  };

  return (
    <Overview
      tasks={tasks}
      onIsTaskCompletedChange={handleToggleTaskComplete}
    />
  );
};
