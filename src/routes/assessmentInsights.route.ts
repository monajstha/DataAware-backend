import { createRouter, RouteConfig } from "./router.js";
import assessmentInsightsController from "../controllers/assessmentInsights.controller.js";

const routes: RouteConfig[] = [
  {
    // submit assessment insight
    method: "post",
    path: "/",
    handler: assessmentInsightsController.submitAssessmentInsight,
  },
];

export default createRouter(routes);
