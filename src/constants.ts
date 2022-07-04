export enum FormError {
  EmptyUsername = "Username must not be empty",
  EmptyEmail = "Email must not be empty",
  AllowedUsernameCharacters = "Username can only contain letters and numbers",
  AllowedEmailCharacters = "Email must contain a valid email address",
  EmptyPassword = "Password must not be empty",
  MinPasswordLength = "Password must be at least 6 characters long",
  PasswordsDoNotMatch = "Passwords do not match",
  EmptyTaskName = "Task name must not be empty",
  EmptyTaskDescription = "Task description must not be empty",
  EmptyTaskDate = "Task date must not be empty",
}
