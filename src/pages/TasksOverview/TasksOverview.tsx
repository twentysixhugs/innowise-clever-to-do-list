import { Overview } from "../../components/Overview";
import { useTasks } from "../../context/TasksStore";

export const TasksOverview = () => {
  const { tasks, toggleTaskCompletion, deleteTask } = useTasks();

  const handleToggleTaskComplete = (id: string) => {
    toggleTaskCompletion(id);
  };

  const handleTaskDelete = (id: string) => {
    deleteTask(id);
  };

  return (
    <Overview
      tasks={tasks}
      onIsTaskCompletedChange={handleToggleTaskComplete}
      onTaskDelete={handleTaskDelete}
    />
  );
};
