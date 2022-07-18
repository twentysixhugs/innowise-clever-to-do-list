import { Timestamp } from "firebase/firestore";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { TaskForm } from "../../components/TaskForm";
import { Toast } from "../../components/Toast";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { taskService } from "../../services/taskService";

const TaskCreate = () => {
  const { createTask } = useTasks();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [serverError, setServerError] = useState<null | string>(null);

  const handleSubmit = useCallback(
    (name: string, description: string, date: Date) => {
      setIsLoading(true);

      setServerError(null);

      taskService
        .createOneForUser({
          name,
          description,
          timestamp: Timestamp.fromDate(date),
          isCompleted: false,
        })
        .then((data) => {
          const { name, description, timestamp, id } = data;

          createTask(name, description, timestamp.toDate(), id);
          setIsLoading(false);

          navigate("/");
        })
        .catch((err) => {
          setServerError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [navigate, createTask]
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
        onSubmit={handleSubmit}
        cancelButtonText="Cancel"
        submitButtonText="Create"
        title="Create task"
      />
    </>
  );
};

export default TaskCreate;
