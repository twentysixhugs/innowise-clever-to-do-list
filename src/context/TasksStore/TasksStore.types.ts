import { ITask } from "../../interfaces/task.interface";

export type TasksStoreState = {
  tasks: ITask[];
};

export type TasksStoreProps = {
  children?: React.ReactNode;
};

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
