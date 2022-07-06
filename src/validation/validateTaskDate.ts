import { FormError } from "../constants";

export function validateTaskDate(
  taskDate: Date | null | undefined
): "" | FormError {
  if (!taskDate) {
    return FormError.EmptyTaskDate;
  }

  return "";
}
