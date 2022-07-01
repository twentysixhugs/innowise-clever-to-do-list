import { useNavigate, useParams } from "react-router-dom";
import { TaskForm } from "../../components/TaskForm";
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
    <TaskForm
      initialTaskData={taskToUpdate}
      onSubmit={handleSubmit}
      cancelButtonText="Cancel"
      submitButtonText="Update"
      title="Update task"
    />
  );
};
