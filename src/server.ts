import app from "./app";
import appConfig from "./config/app.config";

app.listen(appConfig.port, () => {
  console.log(`[server]: Server is running on ${appConfig.port}`);
});
