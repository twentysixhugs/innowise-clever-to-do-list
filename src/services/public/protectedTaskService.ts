import { ITaskDBInput, ITaskDBOutput } from "../../interfaces/Task.interface";
import { ProtectedDatabaseService } from "../abstract/ProtectedDatabaseService";
import { FirebaseAuthService } from "../firebase/FirebaseAuthService";
import { FirestoreService } from "../firebase/FirestoreService";

class ProtectedTaskService {
  private db: ProtectedDatabaseService<ITaskDBInput, ITaskDBOutput>;

  constructor(
    databaseService: ProtectedDatabaseService<ITaskDBInput, ITaskDBOutput>
  ) {
    this.db = databaseService;
  }

  async getAll() {
    return await this.db.getAllForUser();
  }

  async getAllByDay(date: Date) {
    return await this.db.getAllByDayForUser(date);
  }

  async getOneByPath(path: string) {
    return await this.db.getOneForUserByPath(path);
  }

  async createOne(data: ITaskDBInput) {
    return await this.db.createOneForUser(data);
  }

  async updateOne(
    path: string,
    data: { [T in keyof ITaskDBInput]?: ITaskDBInput[T] }
  ) {
    return await this.db.updateOneForUser(path, data);
  }

  async deleteOne(path: string) {
    return await this.db.deleteOneForUser(path);
  }
}

const protectedTaskService = new ProtectedTaskService(
  new FirestoreService("tasks", new FirebaseAuthService())
);

export { protectedTaskService };
