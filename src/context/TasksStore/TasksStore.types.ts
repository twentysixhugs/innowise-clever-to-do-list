import { ITask } from "../../interfaces/Task.interface";

export type TasksStoreState = {
  tasks: ITask[];
};

export type TasksStoreProps = {
  children?: React.ReactNode;
};

export interface ITasksContext {
  tasks: ITask[];
  toggleTaskCompletion: (id: string) => void;
  appendTasks: (newTasks: ITask[]) => void;
  getTasksByDate: (year: number, month: number, day: number) => ITask[];
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
  resetTasks: () => void;
}
