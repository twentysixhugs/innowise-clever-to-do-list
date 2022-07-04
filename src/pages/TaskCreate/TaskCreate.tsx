import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TaskForm } from "../../components/TaskForm";
import { useTasks } from "../../context/TasksStore";

const TaskCreate = () => {
  const { createTask } = useTasks();

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (name: string, description: string, date: Date) => {
      // юз колбек
      createTask(
        name,
        description,
        date,
        // временно id генерирую вот так, дальше будет из firebase
        `${Math.floor(Math.random() * 1000000)}`
      );
      navigate("/");
    },
    [navigate, createTask]
  );

  return (
    <TaskForm
      onSubmit={handleSubmit}
      cancelButtonText="Cancel"
      submitButtonText="Create"
      title="Create task"
    />
  );
};

export default TaskCreate;
