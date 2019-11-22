
import { AuthService } from "./services/auth.service";
import { UserRepository,  } from "./repositories";
import { AuthController } from "./controllers";
import { JwtHelper, Controller, HashEncrypter } from "common";
import { Container } from "inversify";

export const diContainer = new Container();

diContainer.bind<JwtHelper>(JwtHelper).toSelf();
diContainer.bind<HashEncrypter>(HashEncrypter).toSelf();
diContainer.bind<UserRepository>(UserRepository).toSelf();
diContainer.bind<AuthService>(AuthService).toSelf();
diContainer.bind<Controller>("Controller").to(AuthController);
