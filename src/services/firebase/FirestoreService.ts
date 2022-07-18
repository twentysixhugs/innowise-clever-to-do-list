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
} from "firebase/firestore";
import { UpdateData } from "firebase/firestore";
import { FirebaseInitService } from "./FirebaseInitService";
import { ProtectedDatabaseService } from "../abstract/ProtectedDatabaseService";
import { FirebaseAuthService } from "./FirebaseAuthService";

export class FirestoreService<Input, Output> extends ProtectedDatabaseService<
  Input,
  Output
> {
  private firebase: FirebaseInitService;
  protected authService: FirebaseAuthService;

  constructor(collectionName: string, authService: FirebaseAuthService) {
    super(collectionName, authService);

    this.authService = authService;

    this.authService.observeAuthState();

    this.firebase = new FirebaseInitService();
  }

  getAllForUser = async (): Promise<Output[]> => {
    if (!this.authService.isAuthenticated) {
      throw new Error("Authentication required");
    }

    const q = query(this.collection, where("uid", "==", this.authService.uid));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as unknown as Output;
    });
  };

  getAllByDayForUser = async (date: Date): Promise<Output[]> => {
    if (!this.authService.isAuthenticated) {
      throw new Error("Authentication required");
    }

    // No matter what time the timestamp has,
    // this method will query everything that matches its day
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const q = query(
      this.collection,
      where("uid", "==", this.authService.uid),
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
    if (!this.authService.isAuthenticated) {
      throw new Error("Authentication required");
    }

    const docRef = doc(this.firebase.db, this.collectionName, path);
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

  createOneForUser = async (data: Input) => {
    if (!this.authService.isAuthenticated) {
      throw new Error("Authentication required");
    }

    const docRef = await addDoc(this.collection, {
      ...data,
      uid: this.authService.uid,
    });

    return await this.getOneForUserByRef(docRef);
  };

  updateOneForUser = async (
    path: string,
    data: { [T in keyof Input]?: Input[T] }
  ) => {
    if (!this.authService.isAuthenticated) {
      throw new Error("Authentication required");
    }

    const docRef = doc(
      this.firebase.db,
      this.collectionName,
      path
    ) as DocumentReference<Input>;

    return await updateDoc(docRef, data as UpdateData<Input>);
  };

  deleteOneForUser = async (path: string) => {
    if (!this.authService.isAuthenticated) {
      throw new Error("Authentication required");
    }

    const docRef = doc(this.firebase.db, this.collectionName, path);

    return await deleteDoc(docRef);
  };

  private getOneForUserByRef = async (ref: DocumentReference<DocumentData>) => {
    if (!this.authService.isAuthenticated) {
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
}
