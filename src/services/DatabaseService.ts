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
  DocumentReference,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  ITask,
  ITaskDBInput,
  ITaskDBOutput,
} from "../interfaces/task.interface";
import { UsernameEmail } from "../interfaces/usernameEmail.interface";

abstract class DatabaseService {
  protected collection;
  protected collectionName;

  constructor(collectionName: string) {
    this.collection = collection(db, collectionName);
    this.collectionName = collectionName;
  }
}

class ProtectedDatabaseService<Input, Output> extends DatabaseService {
  private user;

  constructor(collectionName: string) {
    super(collectionName);

    this.user = getAuth().currentUser;
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

  updateOneForUser = async (path: string, data: Input) => {
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
}

class PublicDatabaseService<T> extends DatabaseService {
  constructor(collectionName: string) {
    super(collectionName);
  }

  createOne = async (data: T) => {
    return await addDoc(this.collection, data);
  };
}

export const TaskService = new ProtectedDatabaseService<
  ITaskDBInput,
  ITaskDBOutput
>("tasks");

export const UsernameEmailService = new PublicDatabaseService<UsernameEmail>(
  "usernamesForEmails"
);
