import "reflect-metadata";
import serverless from "serverless-http";
import express from "express";
import { AppDataSource } from "./ormconfig";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import customerRoutes from "./routes/customers";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

app.use("/api/customers", customerRoutes);

let isDbInitialized = false;

const initializeDatabase = async () => {
    if (!isDbInitialized && !AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        isDbInitialized = true;
        console.log("Database connected");
    }
};

export const handler = async (event: any, context: any) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await initializeDatabase();
    const serverlessHandler = serverless(app);
    return serverlessHandler(event, context);
};
