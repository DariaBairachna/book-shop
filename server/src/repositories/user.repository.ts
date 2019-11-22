import { UserEntity } from "../entities";
import { Model } from "sequelize";
import { injectable } from "inversify";

export interface UserSequelizeScheme extends UserEntity, Model<UserEntity> { }

export class UserModel extends Model implements UserEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

@injectable()
export class UserRepository {
  constructor() { }

  async add(entity: UserEntity): Promise<UserEntity> {
    let newValue = await UserModel.create(entity);
    return newValue;
  }

  async findOne(email: string, password: string): Promise<UserEntity> {
    const users = await UserModel.findAll();
    console.log("Find All");
    console.log(users);
    const result = await UserModel.findOne({
      where: { email: email, password: password }
    });
    return result;
  }
}
