import { ITaskDBInput, ITaskDBOutput } from "../interfaces/task.interface";
import { ProtectedDatabaseService } from "./ProtectedDatabaseService";

export const TaskService = new ProtectedDatabaseService<
  ITaskDBInput,
  ITaskDBOutput
>("tasks");
