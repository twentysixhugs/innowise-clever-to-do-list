import { FormError } from "../constants";

export function validateTaskName(taskName: string): "" | FormError {
  if (!taskName) {
    return FormError.EmptyTaskName;
  }

  return "";
}
