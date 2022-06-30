import { useNavigate } from "react-router-dom";
import { TaskCreateForm } from "../../components/TaskCreateForm";
import { ITask } from "../../interfaces/task.interface";

interface ITaskCreateProps {
  onSubmit: (name: string, description: string, date: Date) => void;
}

export const TaskCreate = ({ onSubmit }: ITaskCreateProps) => {
  const navigate = useNavigate();

  const handleSubmit = (name: string, description: string, date: Date) => {
    // отсюда хочу сделать запрос к firebase и после ответа обновить контекст.
    // пока вызываю обновление тасков в стейте
    onSubmit(name, description, date);
    navigate("/");
  };
  return <TaskCreateForm onSubmit={handleSubmit} />;
};
