import { createRouter, RouteConfig } from "./router";
import scenariosController from "@controllers/scenerios.controller";

const routes: RouteConfig[] = [
  {
    // get all app categories
    method: "get",
    path: "/",
    // middlewares: [validationMiddleware.validateBody(authSchema.login)],
    handler: scenariosController.getScenerios,
  },
];

export default createRouter(routes);
