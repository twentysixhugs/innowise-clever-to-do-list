import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { TaskForm } from "../../components/TaskForm";
import { useTasks } from "../../context/TasksStore";
import { TaskService } from "../../services/DatabaseService";

const TaskUpdate = () => {
  const { tasks, updateTask } = useTasks();

  const { id } = useParams();
  const navigate = useNavigate();

  const taskToUpdate = tasks.find((task) => task.id === id);

  const handleSubmit = useCallback(
    (name: string, description: string, date: Date) => {
      if (!taskToUpdate) return;

      const { id } = taskToUpdate;

      TaskService.updateOneForUser(id, {
        name,
        description,
        timestamp: Timestamp.fromDate(date),
        isCompleted: false,
      })
        .then(() => {
          return TaskService.getOneForUserByPath(id);
        })
        .then((data) => {
          const { name, description, timestamp, id } = data;

          updateTask(name, description, timestamp.toDate(), id);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [updateTask, navigate, taskToUpdate]
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
