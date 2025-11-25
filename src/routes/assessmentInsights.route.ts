import { createRouter, RouteConfig } from "./router";
import assessmentInsightsController from "@controllers/assessmentInsights.controller";

const routes: RouteConfig[] = [
  {
    // submit assessment insight
    method: "post",
    path: "/",
    handler: assessmentInsightsController.submitAssessmentInsight,
  },
];

export default createRouter(routes);
