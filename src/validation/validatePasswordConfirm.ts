import { FormError } from "../constants";

export function validatePasswordConfirm(
  password: string,
  passwordConfirm: string
) {
  if (password !== passwordConfirm) {
    return FormError.PasswordsDoNotMatch;
  }

  return "";
}
