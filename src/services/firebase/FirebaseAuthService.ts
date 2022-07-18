import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthService } from "../abstract/AuthService";

export class FirebaseAuthService extends AuthService {
  observeAuthState(): void {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      this.isAuthenticated = !!user;
      this.uid = user ? user.uid : null;
    });
  }
}
