import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { TaskForm } from "../../components/TaskForm";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { taskService } from "../../services/taskService";
import { Loader } from "../../components/Loader";
import { FirebaseError } from "@firebase/util";
import { Toast } from "../../components/Toast";

const TaskUpdate = () => {
  const { tasks, updateTask } = useTasks();

  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [serverError, setServerError] = useState<null | string>(null);

  const taskToUpdate = tasks.find((task) => task.id === id);

  const handleSubmit = useCallback(
    (name: string, description: string, date: Date) => {
      if (!taskToUpdate) return;

      setIsLoading(true);

      const { id } = taskToUpdate;

      setServerError(null);

      taskService
        .updateOneForUser(id, {
          name,
          description,
          timestamp: Timestamp.fromDate(date),
          isCompleted: false,
        })
        .then(() => {
          return taskService.getOneForUserByPath(id);
        })
        .then((data) => {
          const { name, description, timestamp, id } = data;

          updateTask(name, description, timestamp.toDate(), id);
          navigate("/");
        })
        .catch((err: FirebaseError) => {
          setServerError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [updateTask, navigate, taskToUpdate]
  );

  const handleToastClose = (
    e: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setServerError(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Toast
        color="error"
        message={serverError}
        isOpen={!!serverError}
        onClose={handleToastClose}
      />
      <TaskForm
        initialTaskData={taskToUpdate}
        onSubmit={handleSubmit}
        cancelButtonText="Cancel"
        submitButtonText="Update"
        title="Update task"
      />
    </>
  );
};

export default TaskUpdate;
