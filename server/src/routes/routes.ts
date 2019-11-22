import { Request, Response, Application } from "express";
import { diContainer } from "di-container";
import { Controller, ErrorHandler } from "common";

export class Routes {
  routes(app: Application): void {
    const controllers = diContainer.getAll<Controller>("Controller");
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "GET request successfulll!!!!"
      });
    });
    for (const controller of controllers) {
      const routes = controller.routes();
      for (const route of routes) {
        if (route.type === "GET") {
          app.route(route.route).get(ErrorHandler(route.handlers));
        }
        if (route.type === "POST") {
          app.route(route.route).post(ErrorHandler(route.handlers));
        }
      }
    }
  }
}
