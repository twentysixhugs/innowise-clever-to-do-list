import { DatabaseService } from "./DatabaseService";
import { AuthService } from "./AuthService";

export abstract class ProtectedDatabaseService<
  Input,
  Output
> extends DatabaseService {
  protected authService: AuthService;

  constructor(collectionName: string, authService: AuthService) {
    super(collectionName);

    this.authService = authService;

    this.authService.observeAuthState();
  }

  abstract getAllForUser: () => Promise<Output[]>;

  abstract getAllByDayForUser: (date: Date) => Promise<Output[]>;

  abstract getOneForUserByPath: (path: string) => Promise<Output>;

  abstract createOneForUser: (data: Input) => Promise<Output>;

  abstract updateOneForUser: (
    path: string,
    data: { [T in keyof Input]?: Input[T] }
  ) => Promise<void>;

  abstract deleteOneForUser: (path: string) => Promise<void>;
}
