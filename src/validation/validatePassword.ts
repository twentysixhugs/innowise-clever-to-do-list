import { FormError } from "../constants";

export function validatePassword(password: string): "" | FormError {
  if (!password) {
    return FormError.EmptyPassword;
  }

  if (password.length < 6) {
    return FormError.MinPasswordLength;
  }

  return "";
}
