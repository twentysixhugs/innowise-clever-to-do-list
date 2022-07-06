import { UsernameEmail } from "../interfaces/usernameEmail.interface";
import { PublicDatabaseService } from "./templates/PublicDatabaseService";

export const usernameEmailService = new PublicDatabaseService<UsernameEmail>(
  "usernamesForEmails"
);
