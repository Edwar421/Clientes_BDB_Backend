import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./ormconfig";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import customerRoutes from "./routes/customers";
import path from "path";

const appMode = (process.env.APP_MODE || "dev").toLowerCase();
const envFile = appMode === "prod" ? ".env.prod" : ".env.dev";

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const app = express();
const appName =
    process.env.APP_NAME ||
    (appMode === "prod" ? "customers-prod" : "customers-dev");
const logMessage =
    process.env.APP_LOG_MESSAGE ||
    (appMode === "prod" ? "Ejecutando en PROD" : "Ejecutando en DEV");
const PORT = Number(
    process.env.SERVER_PORT || (appMode === "prod" ? 9090 : 8080)
);

app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

app.use("/api/customers", customerRoutes);

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log(`Database connected for ${appName}`);
        console.log(logMessage);

        app.listen(PORT, () => {
            console.log(`${appName} running on port ${PORT}`);
            console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
        process.exit(1);
    }
};

startServer();
