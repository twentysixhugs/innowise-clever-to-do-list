import { ITaskInput } from "../../interfaces/taskinput.interface";

export type TaskUpdateFormProps = {
  onSubmit: (name: string, description: string, date: Date) => void;
  initialTaskData?: ITaskInput;
  submitButtonText: string;
  cancelButtonText: string;
  title: string;
};
