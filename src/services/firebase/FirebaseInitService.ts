import { Firestore, getFirestore } from "firebase/firestore";
import { initializeApp } from "@firebase/app";

export class FirebaseInitService {
  public db: Firestore;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_APIKEY,
      authDomain: process.env.REACT_APP_AUTHDOMAIN,
      projectId: process.env.REACT_APP_PROJECTID,
      storageBucket: process.env.REACT_APP_STORAGEBUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
      appId: process.env.REACT_APP_APPID,
    };

    const app = initializeApp(firebaseConfig);

    this.db = getFirestore(app);
  }
}
