import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { useState } from "react";

export const useAuthStateObserver = (): [User | null, boolean] => {
  const auth = getAuth();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  onAuthStateChanged(auth, (user) => {
    setIsLoading(false);

    setUser(user);
  });

  return [user, isLoading];
};
