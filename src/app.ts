import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./ormconfig";
import dotenv from "dotenv";
import cors from "cors";
import customerRoutes from "./routes/customers";

dotenv.config();

const app = express();
const appMode = (process.env.APP_MODE || "dev").toLowerCase();
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
app.use("/api/customers", customerRoutes);

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log(`Database connected for ${appName}`);
        console.log(logMessage);

        app.listen(PORT, () => {
            console.log(`${appName} running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
        process.exit(1);
    }
};

startServer();
