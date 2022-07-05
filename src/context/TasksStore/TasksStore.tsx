import React, { useCallback, useContext, useEffect, useState } from "react";
import { ITask } from "../../interfaces/task.interface";
import {
  TasksStoreState,
  TasksStoreProps,
  ITasksContext,
} from "./TasksStore.types";

const TasksContext = React.createContext({} as ITasksContext);

// Instead of exporting TasksContext and calling useContext(TasksContext),
// export the hook that gives access to it

export const useTasks = () => {
  return useContext(TasksContext);
};

export class TasksStore extends React.Component<
  TasksStoreProps,
  TasksStoreState
> {
  state: TasksStoreState = {
    tasks: [],
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
