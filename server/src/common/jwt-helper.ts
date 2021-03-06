import { Environments } from "./../environment/environment";
import { AuthUserModel, AuthContextModel, AuthResponseModel } from "models";
import * as jsonwebtoken from "jsonwebtoken";
import { injectable } from "inversify";

@injectable()
export class JwtHelper {
  authenticate(user: AuthUserModel): AuthResponseModel {
    const authContext: AuthContextModel = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    const token = jsonwebtoken.sign(authContext, Environments.secret, {
      expiresIn: Environments.tokenExpiresIn
    });
    return {
      token: token,
      user: authContext,
      expiresIn: Environments.tokenExpiresIn,
      role: authContext.role
    };
  }

  verify(token: string): Promise<AuthContextModel> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, Environments.secret, (err, decoded) => {
        if (err) {
          reject(null);
          return;
        }
        resolve(decoded);
      });
    });
  }
}
