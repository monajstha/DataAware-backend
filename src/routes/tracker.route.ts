import { createRouter, RouteConfig } from "./router";
import trakcersController from "@controllers/trackers.controller";

const routes: RouteConfig[] = [
  {
    // get all trackers
    method: "get",
    path: "/",
    // middlewares: [validationMiddleware.validateBody(authSchema.login)],
    handler: trakcersController.getTrackers,
  },
];

export default createRouter(routes);
