import { createRouter, RouteConfig } from "./router";
import appCategoriesController from "@controllers/appCategory.controller";

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
