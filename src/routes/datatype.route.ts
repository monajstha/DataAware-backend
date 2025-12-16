import { createRouter, RouteConfig } from "./router.js";
import datatypesController from "../controllers/datatypes.controller.js";

const routes: RouteConfig[] = [
  {
    // get all trackers
    method: "get",
    path: "/",
    // middlewares: [validationMiddleware.validateBody(authSchema.login)],
    handler: datatypesController.getDatatypes,
  },
];

export default createRouter(routes);
