import { db } from "../../init/firebase";
import { collection } from "firebase/firestore";

export abstract class DatabaseService {
  protected collection;
  protected collectionName;

  constructor(collectionName: string) {
    this.collection = collection(db, collectionName);
    this.collectionName = collectionName;
  }
}
