import { createRouter, RouteConfig } from "./router.js";
import scenariosController from "../controllers/scenarios.controller.js";

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
