import { NavigateFunction } from "react-router-dom";
import { FormError } from "../../constants";
import { ITaskInput } from "../../interfaces/TaskInput.interface";

export type TaskFormProps = {
  onSubmit: (name: string, description: string, date: Date) => void;
  initialTaskData?: ITaskInput;
  submitButtonText: string;
  cancelButtonText: string;
  title: string;
  navigate: NavigateFunction;
};

export type TaskFormState = {
  input: ITaskInput;
  errors: { [K in keyof ITaskInput]: FormError | "" };
};
