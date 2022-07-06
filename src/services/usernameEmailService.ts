import { UsernameEmail } from "../interfaces/UsernameEmail.interface";
import { PublicDatabaseService } from "./templates/PublicDatabaseService";

export const usernameEmailService = new PublicDatabaseService<UsernameEmail>(
  "usernamesForEmails"
);
