import React, { useCallback, useContext, useEffect, useState } from "react";
import { ITask } from "../../interfaces/Task.interface";
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

  handleAppendTasks = (newTasks: ITask[]) => {
    this.setState(({ tasks }) => {
      return {
        tasks: [...tasks, ...newTasks],
      };
    });
  };

  handleGetTasksByDate = (year: number, month: number, day: number) => {
    return this.state.tasks.filter(({ date }) => {
      const taskYear = date.getFullYear();
      const taskMonth = date.getMonth();
      const taskDay = date.getDate();

      if (taskYear === year && taskMonth === month && taskDay == day) {
        return true;
      }

      return false;
    });
  };

  resetTasks = () => {
    this.setState(({ tasks }) => ({ tasks: [] }));
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
          appendTasks: this.handleAppendTasks,
          getTasksByDate: this.handleGetTasksByDate,
          resetTasks: this.resetTasks,
        }}
      >
        {this.props.children}
      </TasksContext.Provider>
    );
  }
}
