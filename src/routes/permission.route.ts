import permissionController from "@controllers/permission.controller";
import { createRouter, RouteConfig } from "./router";

const routes: RouteConfig[] = [
  {
    // login
    method: "get",
    path: "/",
    // middlewares: [validationMiddleware.validateBody(authSchema.login)],
    handler: permissionController.getPermissions,
  },
];

export default createRouter(routes);
