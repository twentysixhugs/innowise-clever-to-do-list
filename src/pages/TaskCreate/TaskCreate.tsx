import { useNavigate } from "react-router-dom";
import { TaskCreateForm } from "../../components/TaskCreateForm";
import { useTasks } from "../../context/TasksStore";

export const TaskCreate = () => {
  const { createTask } = useTasks();

  const navigate = useNavigate();

  const handleSubmit = (name: string, description: string, date: Date) => {
    createTask(
      name,
      description,
      date,
      // временно id генерирую вот так, дальше будет из firebase
      `${Math.floor(Math.random() * 1000000)}`
    );
    navigate("/");
  };
  return <TaskCreateForm onSubmit={handleSubmit} />;
};
