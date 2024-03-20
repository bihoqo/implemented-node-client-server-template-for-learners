// routes.ts
import express, {Request, Response, Router} from "express";
import {getLoginTokenAndUser} from "../logic/login-controller";

const authRouter: Router = express.Router();

/**
 * Login
 * Request should be a POST request with the following body:
 * - name: string
 * - password: string
 * e.g. {
 *  "name": "John",
 *  "password": "password"
 *  }
 */
authRouter.post("/login", async (req: Request, res: Response) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).send("Missing name or password");
    }
    const loginTokenRes = await getLoginTokenAndUser(name, password);

    if (loginTokenRes.isErr()) {
        return res.status(401).send(loginTokenRes.error);
    }
    const { token, user } = loginTokenRes.value;

    res.json({ token, user });
});

export default authRouter;
