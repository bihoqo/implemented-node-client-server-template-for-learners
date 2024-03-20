import bcrypt from "bcrypt";
import dayjs from "dayjs";
import {Result, err, ok} from "neverthrow";
import {UserDoc, UserModel} from "../schemas/users-schema";
import {UserResponse} from "../interfaces";

export function removeSensitiveDataFromUser(userDoc: UserDoc): UserResponse {
    return {
        name: userDoc.name,
        email: userDoc.email,
        dateOfBirth: userDoc.dateOfBirth,
        country: userDoc.country,
        _id: userDoc._id,
    };
}

export async function findAllUsers(): Promise<Result<UserDoc[], string>> {
    try {
        return ok(await UserModel.find({}) as UserDoc[]);
    } catch (error) {
        return err("Failed to fetch users from the database");
    }
}

export async function findUserByName(
    name: string
): Promise<Result<UserDoc, string>> {
    try {
        const user = await UserModel.findOne({name: name.toLowerCase()});

        if (!user) {
            return err(`User ${name} not found`);
        }
        return ok(user);
    } catch (error) {
        return err("Failed to fetch user from the database");
    }
}

export async function findUserByEmail(
    email: string
): Promise<Result<UserDoc, string>> {
    try {
        const user = await UserModel.findOne({email: email.toLowerCase()});
        if (!user) {
            return err(`User ${email} not found`);
        }
        return ok(user);
    } catch (error) {
        return err("Failed to fetch user from the database");
    }
}

interface AddUserParams {
    name: string;
    dateOfBirth: string;
    country: string;
    email: string;
    password: string;
}

export async function addUser(
    params: AddUserParams
): Promise<Result<void, string>> {
    // Hash the password
    const hashedPassword = hashPassword(params.password);

    // Create a new user document
    const newUser: UserDoc = new UserModel({
        name: params.name.toLowerCase(),
        dateOfBirth: dayjs(params.dateOfBirth).toDate(),
        country: params.country,
        email: params.email.toLowerCase(),
        hashedPassword,
    });

    const userExistsRes = await getIsUserExistsInDb(newUser.name, newUser.email);

    if (userExistsRes.isErr()) {
        return err(userExistsRes.error);
    }

    const isUserExists = userExistsRes.value;

    if (isUserExists) {
        return err("User already exists");
    }

    try {
        // Save the user to the database
        await newUser.save();
        return ok(void 0);
    } catch (error: any) {
        return err("Failed to add user to database");
    }
}

export function hashPassword(password: string) {
    // Hash the password
    return bcrypt.hashSync(password, 10);
}

export async function getIsUserExistsInDb(
    userName: string,
    email: string
): Promise<Result<boolean, string>> {
    try {
        // Find a user with the given userName or email
        const existingUser = await UserModel.findOne({
            $or: [{name: userName.toLowerCase()}, {email: email.toLowerCase()}],
        });

        // If a user with the given userName or email is found, return true
        if (existingUser) {
            return ok(true)
        }
        // If no user is found with the given userName or email, return false
        return ok(false);
    } catch (error) {
        return err("Failed to check if user exists");
    }
}
