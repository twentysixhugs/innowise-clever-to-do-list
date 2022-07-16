import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuthStateObserver = (): [User | null, boolean] => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);

      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return [user, isLoading];
};
