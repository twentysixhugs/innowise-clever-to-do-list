import { useNavigate, useParams } from "react-router-dom";
import { TaskUpdateForm } from "../../components/TaskUpdateForm";
import { useTasks } from "../../context/TasksStore";

export const TaskUpdate = () => {
  const { tasks, updateTask } = useTasks();

  const { id } = useParams();
  const navigate = useNavigate();

  const taskToUpdate = tasks.find((task) => task.id === id)!;

  const handleSubmit = (name: string, description: string, date: Date) => {
    updateTask(name, description, date, id!);
    navigate("/");
  };

  return (
    <TaskUpdateForm initialTaskData={taskToUpdate} onSubmit={handleSubmit} />
  );
};
