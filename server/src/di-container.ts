import { Container } from "inversify";
import { AuthService } from "./services/auth.service";
import { UserRepository, BookRepository, AuthorRepository, BookInAuthorRepository} from "./repositories";
import { AuthController } from "./controllers";
import { JwtHelper, Controller, HashEncrypter } from "./common";
import { BookService, AuthorService, BookInAuthorService } from "./services";
import { BookController, AuthorController, BookInAuthorController } from "./controllers";


export const diContainer = new Container();

diContainer.bind<JwtHelper>(JwtHelper).toSelf();
diContainer.bind<HashEncrypter>(HashEncrypter).toSelf();

diContainer.bind<UserRepository>(UserRepository).toSelf();
diContainer.bind<AuthService>(AuthService).toSelf();
diContainer.bind<Controller>("Controller").to(AuthController);

diContainer.bind<BookRepository>(BookRepository).toSelf();
diContainer.bind<BookService>(BookService).toSelf();
diContainer.bind<Controller>("Controller").to(BookController);

diContainer.bind<AuthorRepository>(AuthorRepository).toSelf();
diContainer.bind<AuthorService>(AuthorService).toSelf();
diContainer.bind<Controller>("Controller").to(AuthorController);

diContainer.bind<BookInAuthorRepository>(BookInAuthorRepository).toSelf();
diContainer.bind<BookInAuthorService>(BookInAuthorService).toSelf();
diContainer.bind<Controller>("Controller").to(BookInAuthorController);
