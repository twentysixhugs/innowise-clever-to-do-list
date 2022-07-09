import { FormError } from "../../constants";
import { ITaskInput } from "../../interfaces/TaskInput.interface";

export type TaskFormProps = {
  onSubmit: (name: string, description: string, date: Date) => void;
  initialTaskData?: ITaskInput;
  submitButtonText: string;
  cancelButtonText: string;
  title: string;
};

export type TaskFormState = {
  input: ITaskInput;
  errors: { [K in keyof ITaskInput]: FormError | "" };
  navigateTo: string | number | null;
};
