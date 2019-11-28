import { AuthService } from "../services/auth.service";
import {
  AuthResponseModel,
  AuthLoginModel,
  AuthRegisterModel,
  AuthContextModel
} from "models";
import { injectable, inject } from "inversify";
import {
  JwtHelper,
  Controller,
  RequestPost,
  ResponseBase,
  RequestGet,
  RouteHandler
} from "../common";
import { AuthMiddleware } from "../middlewares/auth.middleware";

@injectable()
export class AuthController implements Controller {
  @inject(AuthService) private _authService: AuthService;
  @inject(JwtHelper) private _jwtHelper: JwtHelper;

  constructor() {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.profile = this.profile.bind(this);
  }

  async register(
    request: RequestPost<AuthRegisterModel>,
    response: ResponseBase<AuthResponseModel>
  ) {
   
    const user = await this._authService.register({ ...request.body });
    const authContext = this._jwtHelper.authenticate(user);
    return response.send(authContext);
  }

  async login(
    request: RequestPost<AuthLoginModel>,
    response: ResponseBase<AuthResponseModel>
  ) {
    const user = await this._authService.get(
      request.body.email,
      request.body.password
    );
    const authContext = this._jwtHelper.authenticate(user);
    return response.send(authContext);
  }

  profile(request: RequestGet<{}>, response: ResponseBase<AuthContextModel>) {
    return response.send(request.user);
  }

  routes(): RouteHandler[] {
    const handlers: RouteHandler[] = [];
    const prefix = "auth";
    handlers.push({
      route: `/${prefix}/profile`,
      handlers: [AuthMiddleware, <any>this.profile],
      type: "GET"
    });
    handlers.push({
      route: `/${prefix}/register`,
      handlers: [<any>this.register],
      type: "POST"
    });
    handlers.push({
      route: `/${prefix}/login`,
      handlers: [<any>this.login],
      type: "POST"
    });
    return handlers;
  }
}
