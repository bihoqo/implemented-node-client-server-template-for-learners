import {SignData, UserResponse} from "../interfaces";
import {err, ok, Result} from "neverthrow";
import {UserDoc} from "../schemas/users-schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../const/env";
import {findUserByName, removeSensitiveDataFromUser} from "./users-controller";

interface GetLoginResult {
    token: string;
    user: UserResponse;
}

export async function getLoginTokenAndUser(
    userName: string,
    password: string
): Promise<Result<GetLoginResult, string>> {
    // Find user by username
    const foundUserRes: Result<UserDoc, string> = await findUserByName(
        userName.toLowerCase()
    );

    if (foundUserRes.isErr()) {
        return err("Invalid username or password");
    }

    const foundUser: UserDoc = foundUserRes.value;

    // Check password
    const passwordMatch: boolean = await bcrypt.compare(
        password,
        foundUser.hashedPassword
    );

    if (!passwordMatch) {
        return err("Invalid username or password");
    }

    // Create object to sign
    const objectToSign: SignData = {
        userId: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
    };

    // Generate JWT token
    const token: string = jwt.sign(objectToSign, JWT_SECRET, {
        expiresIn: "24h",
    });

    return ok({ token, user: removeSensitiveDataFromUser(foundUser) });
}

