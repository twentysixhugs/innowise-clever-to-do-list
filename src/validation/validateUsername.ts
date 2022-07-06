import { FormError } from "../constants";

export function validateUsername(username: string): "" | FormError {
  if (!username) {
    return FormError.EmptyUsername;
  }

  if (!username.match(/^[a-zA-Z0-9]+$/)) {
    return FormError.AllowedUsernameCharacters;
  }

  return "";
}
