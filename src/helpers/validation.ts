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

export function validatePasswordConfirm(
  password: string,
  passwordConfirm: string
) {
  if (password !== passwordConfirm) {
    return FormError.PasswordsDoNotMatch;
  }

  return "";
}

export function validateUsername(username: string): "" | FormError {
  if (!username) {
    return FormError.EmptyUsername;
  }

  if (!username.match(/^[a-zA-Z0-9]+$/)) {
    return FormError.AllowedUsernameCharacters;
  }

  return "";
}

export function validateEmail(email: string): "" | FormError {
  if (!email) {
    return FormError.EmptyEmail;
  }

  //eslint-disable-next-line
  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return FormError.AllowedEmailCharacters;
  }

  return "";
}

export function validateTaskName(taskName: string): "" | FormError {
  if (!taskName) {
    return FormError.EmptyTaskName;
  }

  return "";
}

export function validateTaskDescription(
  taskDescription: string
): "" | FormError {
  if (!taskDescription) {
    return FormError.EmptyTaskDescription;
  }

  return "";
}

export function validateTaskDate(
  taskDate: Date | null | undefined
): "" | FormError {
  if (!taskDate) {
    return FormError.EmptyTaskDate;
  }

  return "";
}
