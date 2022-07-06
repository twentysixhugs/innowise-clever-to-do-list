import { Timestamp } from "firebase/firestore";

export interface ITask {
  name: string;
  description: string;
  date: Date;
  isCompleted: boolean;
  id: string;
}

export interface ITaskDBInput {
  name: string;
  description: string;
  timestamp: Timestamp;
  isCompleted: boolean;
}

export interface ITaskDBOutput {
  name: string;
  description: string;
  timestamp: Timestamp;
  isCompleted: boolean;
  id: string;
  uid: string;
}
