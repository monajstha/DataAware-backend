import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import permissionRoute from "@routes/permission.route";
import trackerRoute from "@routes/tracker.route";
import sensorRoute from "@routes/sensor.route";
import datatypeRoute from "@routes/datatype.route";
import appCategoryRoute from "@routes/appCategory.route";
import scenarioRoute from "@routes/scenario.route";
import { errorHandler } from "@middlewares/errorHandler";
import assessmentInsightsRoute from "@routes/assessmentInsights.route";

const app = express();

app.use(express.json()); // this app level express middleware parses form data to req.body
// app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(express.urlencoded({ extended: true })); // reads and turns html form submissions into nice JS objects
// app.use(methodOverride("_method")); // look for ?_method=PUT in POST requests

app.use(
  cors({
    origin: [
      "http://localhost:5174", // frontend url
      "https://data-aware.netlify.app", // production url
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/permissions", permissionRoute);
app.use("/api/trackers", trackerRoute);
app.use("/api/sensors", sensorRoute);
app.use("/api/dataValue", datatypeRoute);
app.use("/api/appcategories", appCategoryRoute);
app.use("/api/scenarios", scenarioRoute);
app.use("/api/assessment-insights", assessmentInsightsRoute);

// Handle all unmatched routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("The page you are looking for isn't here :(");
  (error as any).status = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);

export default app;
