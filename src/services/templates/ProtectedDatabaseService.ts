import { db } from "../../firebase";
import {
  DocumentData,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentReference,
  onSnapshot,
  Query,
} from "firebase/firestore";
import { UpdateData } from "firebase/firestore";
import { getAuth, onAuthStateChanged, Unsubscribe, User } from "firebase/auth";
import { DatabaseService } from "./DatabaseService";

export class ProtectedDatabaseService<Input, Output> extends DatabaseService {
  protected user: User | null = null;

  constructor(collectionName: string) {
    super(collectionName);

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  }

  getAllForUser = async (): Promise<Output[]> => {
    if (!this.user) {
      throw new Error("Authentication required");
    }

    const q = query(this.collection, where("uid", "==", this.user.uid));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as unknown as Output;
    });
  };

  getAllByDayForUser = async (date: Date): Promise<Output[]> => {
    if (!this.user) {
      throw new Error("Authentication required");
    }

    // No matter what time the timestamp has,
    // this method will query everything that matches its day
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const q = query(
      this.collection,
      where("uid", "==", this.user.uid),
      where("timestamp", ">=", new Date(year, month, day)),
      where("timestamp", "<", new Date(year, month, day + 1))
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as unknown as Output;
    });
  };

  getOneForUserByPath = async (path: string): Promise<Output> => {
    if (!this.user) {
      throw new Error("Authentication required");
    }

    const docRef = doc(db, this.collectionName, path);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return {
        ...snapshot.data(),
        id: snapshot.id,
      } as unknown as Output;
    } else {
      throw new Error("Document not found");
    }
  };

  getOneForUserByRef = async (ref: DocumentReference<DocumentData>) => {
    if (!this.user) {
      throw new Error("Authentication required");
    }

    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      return {
        ...snapshot.data(),
        id: snapshot.id,
      } as unknown as Output;
    } else {
      throw new Error("Document not found");
    }
  };

  createOneForUser = async (data: Input) => {
    if (!this.user) {
      throw new Error("Authentication required");
    }

    return await addDoc(this.collection, { ...data, uid: this.user.uid });
  };

  updateOneForUser = async (path: string, data: UpdateData<Input>) => {
    if (!this.user) {
      throw new Error("Authentication required");
    }

    const docRef = doc(
      db,
      this.collectionName,
      path
    ) as DocumentReference<Input>;

    return await updateDoc(docRef, data);
  };

  deleteOneForUser = async (path: string) => {
    if (!this.user) {
      throw new Error("Authentication required");
    }

    const docRef = doc(db, this.collectionName, path);

    return await deleteDoc(docRef);
  };
}
