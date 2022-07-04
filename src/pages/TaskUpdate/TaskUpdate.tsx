import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskForm } from "../../components/TaskForm";
import { useTasks } from "../../context/TasksStore";

const TaskUpdate = () => {
  const { tasks, updateTask } = useTasks();

  const { id } = useParams();
  const navigate = useNavigate();

  const taskToUpdate = tasks.find((task) => task.id === id);

  const handleSubmit = useCallback(
    (name: string, description: string, date: Date) => {
      if (!taskToUpdate) return;

      updateTask(name, description, date, id!);
      navigate("/");
    },
    [updateTask, id, navigate, taskToUpdate]
  );

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

export default TaskUpdate;
