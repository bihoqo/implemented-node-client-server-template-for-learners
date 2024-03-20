import express, {Express, Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import colorfulMorganFormat from "./utils/morgan";
import {DB_CONNECTION_URL, DEFAULT_CONNECTION_URL, PORT} from "./const/env";
import usersRouter from "./routes/users-router";
import authRouter from "./routes/auth-router";
import registerRouter from "./routes/register-router";

export async function startExpressServer() {
    // Create Express app
    const app: Express = express();

    // Connect to db
    if (!DB_CONNECTION_URL) {
        throw new Error(`DB_CONNECTION_URL is not defined, go to .env file and define it.
        \nYou can try using ${DEFAULT_CONNECTION_URL}.`);
    }
    await mongoose.connect(DB_CONNECTION_URL, {});

    // Middleware to parse JSON bodies
    app.use(express.json());

    // Enable CORS for all routes
    app.use(cors());

    // Log all requests and responses
    app.use(morgan(colorfulMorganFormat));

    /**
     * Check if the server is alive
     * Request should be a GET request
     * e.g. /
     */
    app.get("/", (req: Request, res: Response) => {
        res.send("Alive!");
    });

    // Use the routes
    app.use("/", usersRouter);
    app.use("/", authRouter);
    app.use("/", registerRouter);


    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
