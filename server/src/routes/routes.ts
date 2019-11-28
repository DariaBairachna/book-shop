import { Request, Response, Application } from "express";

import { Controller, ErrorHandler } from "../common";

import { diContainer } from "../di-container";



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
