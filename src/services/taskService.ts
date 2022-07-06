import { ITaskDBInput, ITaskDBOutput } from "../interfaces/task.interface";
import { ProtectedDatabaseService } from "./templates/ProtectedDatabaseService";

export const taskService = new ProtectedDatabaseService<
  ITaskDBInput,
  ITaskDBOutput
>("tasks");
