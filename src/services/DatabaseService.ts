import { db } from "../firebase";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ITask } from "../interfaces/task.interface";
import { UsernameEmail } from "../interfaces/usernameEmail.interface";

class DatabaseService<T extends Omit<T, "id">> {
  private collection;
  private collectionName;
  private user;

  constructor(collectionName: string) {
    this.collection = collection(db, collectionName);
    this.collectionName = collectionName;
    this.user = getAuth().currentUser;
  }

  getAllForUser = async (): Promise<T[]> => {
    if (!this.user) {
      throw new Error("Authentication required");
    }

    const q = query(this.collection, where("uid", "==", this.user.uid));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as unknown as T & { id: string };
    });
  };

  getOneForUser = async (path: string): Promise<T> => {
    if (!this.user) {
      throw new Error("Authentication required");
    }

    const docRef = doc(db, this.collectionName, path);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return {
        ...snapshot.data(),
        id: snapshot.id,
      } as unknown as T & { id: string };
    } else {
      throw new Error("Document not found");
    }
  };

  createOneForUser = async (data: T) => {
    if (!this.user) {
      throw new Error("Authentication required");
    }

    return await addDoc(this.collection, data);
  };

  updateOneForUser = async (path: string, data: T) => {
    if (!this.user) {
      throw new Error("Authentication required");
    }

    const docRef = doc(db, this.collectionName, path);

    return await updateDoc(docRef, data);
  };

  deleteOneForUser = async (path: string) => {
    if (!this.user) {
      throw new Error("Authentication required");
    }

    const docRef = doc(db, this.collectionName, path);

    return await deleteDoc(docRef);
  };

  createOne = async (data: T) => {
    return await addDoc(this.collection, data);
  };
}

export const TaskService = new DatabaseService<ITask>("tasks");
export const UsernameEmailService = new DatabaseService<UsernameEmail>(
  "usernamesForEmails"
);
