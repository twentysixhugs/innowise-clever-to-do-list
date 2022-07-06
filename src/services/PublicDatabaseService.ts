import { addDoc } from "firebase/firestore";
import { DatabaseService } from "./DatabaseService";

export class PublicDatabaseService<T> extends DatabaseService {
  constructor(collectionName: string) {
    super(collectionName);
  }

  createOne = async (data: T) => {
    return await addDoc(this.collection, data);
  };
}
