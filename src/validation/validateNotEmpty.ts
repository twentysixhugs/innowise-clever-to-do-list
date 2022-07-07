import { FormError } from "../constants";

export function validateNotEmpty(value: string, error: FormError) {
  if (!value) {
    return error;
  }

  return "";
}
