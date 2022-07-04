import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { useState } from "react";

export const useAuthStateObserver = () => {
  const auth = getAuth();

  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return user;
};
