import { Timestamp } from "firebase/firestore";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskForm } from "../../components/TaskForm";
import { useTasks } from "../../context/TasksStore";
import { TaskService } from "../../services/DatabaseService";

const TaskCreate = () => {
  const { createTask } = useTasks();

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (name: string, description: string, date: Date) => {
      TaskService.createOneForUser({
        name,
        description,
        timestamp: Timestamp.fromDate(date),
        isCompleted: false,
      })
        .then((docRef) => {
          return TaskService.getOneForUserByRef(docRef);
        })
        .then((data) => {
          const { name, description, timestamp, id } = data;

          createTask(name, description, timestamp.toDate(), id);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
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
