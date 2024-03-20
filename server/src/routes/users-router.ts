// routes.ts
import express, {Request, Response, Router} from "express";
import { findAllUsers, findUserByName, removeSensitiveDataFromUser } from "../logic/users-controller";
import { UserDoc } from "../schemas/users-schema";

const usersRouter: Router  = express.Router();

/**
 * Get all registered users
 * Request should be a GET request
 * e.g. /users
 */
usersRouter.get("/users", async (req: Request, res: Response) => {
    const usersRes = await findAllUsers();

    if (usersRes.isErr()) {
        return res.status(500).send(usersRes.error);
    }

    const allUsers = usersRes.value;
    const usersWithoutHashedPassword = allUsers.map((user: UserDoc) => {
        return removeSensitiveDataFromUser(user);
    });

    res.send({
        users: usersWithoutHashedPassword,
        timestamp: new Date().toISOString(),
    });
});

/**
 * Get a user by id
 * Request should be a GET request with the user id as a path parameter
 * e.g. /users/123
 */
usersRouter.get("/users/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userRes = await findUserByName(userId);

    if (userRes.isErr()) {
        return res.status(404).send(userRes.error);
    }

    const user = userRes.value;
    const userWithoutHashedPassword = removeSensitiveDataFromUser(user);

    res.send(userWithoutHashedPassword);
});


export default usersRouter;
