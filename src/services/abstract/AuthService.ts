export abstract class AuthService {
  public isAuthenticated = false;
  public uid: string | null = null;

  abstract observeAuthState(): void;
}
