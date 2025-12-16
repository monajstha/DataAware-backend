import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import permissionRoute from "./routes/permission.route.js";
import trackerRoute from "./routes/tracker.route.js";
import sensorRoute from "./routes/sensor.route.js";
import datatypeRoute from "./routes/datatype.route.js";
import appCategoryRoute from "./routes/appCategory.route.js";
import scenarioRoute from "./routes/scenario.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import assessmentInsightsRoute from "./routes/assessmentInsights.route.js";

const app = express();

app.use(express.json()); // this app level express middleware parses form data to req.body
// app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(express.urlencoded({ extended: true })); // reads and turns html form submissions into nice JS objects
// app.use(methodOverride("_method")); // look for ?_method=PUT in POST requests

app.use(
  cors({
    origin: [
      process.env.LOCAL_URL as string, // frontend url
      process.env.CLIENT_URL as string, // production url
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Health Check Endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "DataAware API",
    version: "1.0.0",
    message: "API is running. Use /api/* endpoints.",
  });
});

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
