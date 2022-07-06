import { UsernameEmail } from "../interfaces/usernameEmail.interface";
import { PublicDatabaseService } from "./PublicDatabaseService";

export const UsernameEmailService = new PublicDatabaseService<UsernameEmail>(
  "usernamesForEmails"
);
