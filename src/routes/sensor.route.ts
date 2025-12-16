import { createRouter, RouteConfig } from "./router.js";
import sensorsController from "../controllers/sensors.controller.js";

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
