import express, {Request, Response, Router} from "express";
import {addUser} from "../logic/users-controller";
import COUNTRIES from "../const/countries";

const registerRouter: Router = express.Router();

/**
 * Register a new user
 * Request should be a POST request with the following body:
 * - name: string
 * - date: Date
 * - country: string
 * - email: string
 * - password: string
 * e.g. {
 *   "name": "John",
 *   "date": "2020-01-01",
 *   "country": "USA",
 *   "email": "pCnXp@example.com",
 *   "password": "password"
 * }
 */
registerRouter.post("/register", async (req: Request, res: Response) => {
    const {name, dateOfBirth, country, email, password} = req.body;

    const missingFields: string[] = [];

    if (!name) missingFields.push("name");
    if (!dateOfBirth) missingFields.push("date");
    if (!country) missingFields.push("country");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!COUNTRIES.includes(country)) missingFields.push("valid country");

    if (missingFields.length > 0) {
        const error = `Missing fields: ${missingFields.join(", ")}`;
        return res.status(400).send(error);
    }

    const result = await addUser({name, dateOfBirth, country, email, password});

    if (result.isErr()) {
        return res.status(400).send(result.error);
    }

    res.send("User registered successfully.");
});

export default registerRouter;
