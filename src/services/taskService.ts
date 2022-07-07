import { ITaskDBInput, ITaskDBOutput } from "../interfaces/Task.interface";
import { ProtectedDatabaseService } from "./templates/ProtectedDatabaseService";
import { TaskService } from "./templates/TaskService";

export const taskService = new TaskService<ITaskDBInput, ITaskDBOutput>(
  "tasks"
);
