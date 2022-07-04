import React, { useCallback, useContext, useEffect, useState } from "react";
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

type TasksStoreState = {
  tasks: ITask[];
};

type TasksStoreProps = {
  children?: React.ReactNode;
};

export class TasksStore extends React.Component<
  TasksStoreProps,
  TasksStoreState
> {
  state = {
    tasks: [
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
    ],
  };

  handleToggleTaskCompletion = (id: string) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          };
        }

        return task;
      });

      return { tasks: newTasks };
    });
  };

  handleCreateTask = (
    name: string,
    description: string,
    date: Date,
    id: string
  ) => {
    this.setState(({ tasks }) => {
      return {
        tasks: [
          ...tasks,
          {
            name,
            description,
            date,
            id,
            isCompleted: false,
          },
        ],
      };
    });
  };

  handleUpdateTask = (
    name: string,
    description: string,
    date: Date,
    id: string
  ) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            name,
            description,
            date,
          };
        }

        return task;
      });

      return {
        tasks: newTasks,
      };
    });
  };

  handleDeleteTask = (id: string) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.filter((task) => task.id !== id),
      };
    });
  };

  render() {
    return (
      <TasksContext.Provider
        value={{
          tasks: this.state.tasks,
          toggleTaskCompletion: this.handleToggleTaskCompletion,
          createTask: this.handleCreateTask,
          updateTask: this.handleUpdateTask,
          deleteTask: this.handleDeleteTask,
        }}
      >
        {this.props.children}
      </TasksContext.Provider>
    );
  }
}
