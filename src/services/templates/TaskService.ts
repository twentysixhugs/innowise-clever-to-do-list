import {
  DocumentData,
  onSnapshot,
  query,
  Query,
  where,
} from "firebase/firestore";
import { ProtectedDatabaseService } from "./ProtectedDatabaseService";

export class TaskService<Input, Output> extends ProtectedDatabaseService<
  Input,
  Output
> {
  constructor(collectionName: string) {
    super(collectionName);
  }

  attachCounterByDateObserver = (
    date: Date,
    countBy: "year" | "month" | "day",
    countTasks: "completed" | "not completed",
    onChange: (value: number) => void
  ) => {
    if (!this.user) {
      throw new Error("Authentication required");
    }

    // No matter what time the timestamp has,
    // this method will query everything that matches its day
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let q: Query<DocumentData> | undefined;

    switch (countBy) {
      case "year": {
        q = query(
          this.collection,
          where("uid", "==", this.user.uid),
          where("timestamp", ">=", new Date(year, 0, 1)),
          where("timestamp", "<", new Date(year + 1, 0, 1)),
          where("isCompleted", "==", countTasks === "completed" ? true : false)
        );
        break;
      }

      case "month": {
        q = query(
          this.collection,
          where("uid", "==", this.user.uid),
          where("timestamp", ">=", new Date(year, month, 1)),
          where("timestamp", "<", new Date(year, month + 1, 1)),
          where("isCompleted", "==", countTasks === "completed" ? true : false)
        );
        break;
      }

      case "day": {
        q = query(
          this.collection,
          where("uid", "==", this.user.uid),
          where("timestamp", ">=", new Date(year, month, day)),
          where("timestamp", "<", new Date(year, month, day + 1)),
          where("isCompleted", "==", countTasks === "completed" ? true : false)
        );

        // q = query(this.collection, where("uid", "==", this.user.uid));
        break;
      }
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        onChange(snapshot.size);
      },
      (err) => {
        throw new Error("Error when attaching query observer: " + err.message);
      }
    );

    return { unsubscribe: unsubscribe };
  };
}
