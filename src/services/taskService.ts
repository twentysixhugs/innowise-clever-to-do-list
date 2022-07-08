import { ITaskDBInput, ITaskDBOutput } from "../interfaces/Task.interface";
import { ProtectedDatabaseService } from "./templates/ProtectedDatabaseService";

export const taskService = new ProtectedDatabaseService<
  ITaskDBInput,
  ITaskDBOutput
>("tasks");
