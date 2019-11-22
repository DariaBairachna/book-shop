import { AuthRegisterModel, AuthUserModel, AuthLoginModel } from "../models";
import { UserRepository } from "../repositories";
import { inject, injectable } from "inversify";
import { ApplicationError } from "common";
import { HashEncrypter } from "common/hash-encrypter";
@injectable()
export class AuthService {
  constructor(
    @inject(UserRepository) private _userRepository: UserRepository,
    @inject(HashEncrypter) private _hashEncrypter: HashEncrypter
  ) { }

  async register(registerModel: AuthRegisterModel): Promise<AuthUserModel> {
    const hashedPassword: string = this._hashEncrypter.getHash(
      registerModel.password
    );
    const existedUser = await this._userRepository.findOne(
      registerModel.email,
      hashedPassword
    );
    if (existedUser) {
      throw new ApplicationError("User already exist!");
    }
    const userEntity = await this._userRepository.add({
      email: registerModel.email,
      firstName: registerModel.firstName,
      lastName: registerModel.lastName,
      password: registerModel.password,
      id: null
    });
    return userEntity;
  }

  async login(loginModel: AuthLoginModel): Promise<AuthUserModel> {
    const hashedPassword: string = this._hashEncrypter.getHash(
      loginModel.password
    );
    const loggedUser = await this._userRepository.findOne(
      loginModel.email,
      hashedPassword
    );

    if (!loggedUser) {
      throw new ApplicationError("User not found!");
    }
  
    return loggedUser;
  }

  async get(login: string, password: string): Promise<AuthUserModel> {
    const hashedPassword = this._hashEncrypter.getHash(password);
    const value = await this._userRepository.findOne(login, hashedPassword);
 
    return {   
      id: value.id,
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      password: value.password
    };
  }
}
