import Express from "express";
import { router } from "./routes/routes";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = Express();

app.use(router);

export { app };
