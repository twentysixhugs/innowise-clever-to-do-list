import React, { useContext, useState } from "react";
import { ITask } from "../interfaces/task.interface";

export interface ITasksContext {
  tasks: ITask[];
  toggleTaskCompletion: (id: string) => void;
  createTask: (
    name: string,
    description: string,
    date: Date,
    id: string
  ) => void;
  updateTask: (
    name: string,
    description: string,
    date: Date,
    id: string
  ) => void;
  deleteTask: (id: string) => void;
}

const TasksContext = React.createContext({} as ITasksContext);

// Instead of exporting TasksContext and calling useContext(TasksContext),
// export the hook that gives access to it

export const useTasks = () => {
  return useContext(TasksContext);
};

interface ITasksStoreProps {
  children?: React.ReactNode;
}

export const TasksStore = ({ children }: ITasksStoreProps) => {
  const [tasks, setTasks] = useState<ITask[]>([
    {
      name: "Lorem ipsum dolor sit amet 1",
      description: "Lorem ipsum dolor sit amet",
      date: new Date(),
      isCompleted: true,
      id: "1",
    },
    {
      name: "Lorem ipsum dolor sit amet 2",
      description: "Lorem ipsum dolor sit amet",
      date: new Date(),
      isCompleted: false,
      id: "2",
    },
    {
      name: "Lorem ipsum dolor sit amet 3",
      description: "",
      date: new Date(),
      isCompleted: true,
      id: "3",
    },
    {
      name: "Lorem ipsum dolor sit amet 4",
      description: "Lorem ipsum dolor sit amet",
      date: new Date(),
      isCompleted: false,
      id: "4",
    },
  ]);

  const handleToggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          };
        }

        return task;
      })
    );
  };

  const handleCreateTask = (
    name: string,
    description: string,
    date: Date,
    id: string
  ) => {
    setTasks([
      ...tasks,
      {
        name,
        description,
        date,
        id,
        isCompleted: false,
      },
    ]);
  };

  const handleUpdateTask = (
    name: string,
    description: string,
    date: Date,
    id: string
  ) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            name,
            description,
            date,
          };
        }

        return task;
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        toggleTaskCompletion: handleToggleTaskCompletion,
        createTask: handleCreateTask,
        updateTask: handleUpdateTask,
        deleteTask: handleDeleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
