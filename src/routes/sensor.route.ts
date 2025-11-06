import { createRouter, RouteConfig } from "./router";
import sensorsController from "@controllers/sensors.controller";

const routes: RouteConfig[] = [
  {
    // get all trackers
    method: "get",
    path: "/",
    // middlewares: [validationMiddleware.validateBody(authSchema.login)],
    handler: sensorsController.getSensors,
  },
];

export default createRouter(routes);
