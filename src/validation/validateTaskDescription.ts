import { FormError } from "../constants";

export function validateTaskDescription(
  taskDescription: string
): "" | FormError {
  if (!taskDescription) {
    return FormError.EmptyTaskDescription;
  }

  return "";
}
