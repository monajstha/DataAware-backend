import permissionsController from "../controllers/permissions.controller.js";
import { createRouter, RouteConfig } from "./router.js";

const routes: RouteConfig[] = [
  {
    // get all permissions
    method: "get",
    path: "/",
    // middlewares: [validationMiddleware.validateBody(authSchema.login)],
    handler: permissionsController.getPermissions,
  },
];

export default createRouter(routes);
