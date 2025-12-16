import { createRouter, RouteConfig } from "./router.js";
import appCategoriesController from "../controllers/appCategory.controller.js";

const routes: RouteConfig[] = [
  {
    // get all app categories
    method: "get",
    path: "/",
    // middlewares: [validationMiddleware.validateBody(authSchema.login)],
    handler: appCategoriesController.getAppCategories,
  },
];

export default createRouter(routes);
