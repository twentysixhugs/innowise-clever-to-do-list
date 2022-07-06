import { FormError } from "../constants";

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
