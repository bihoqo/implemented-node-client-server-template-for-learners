import axios, {AxiosResponse} from "axios";
import {RegisterFormData, UserResponse} from "../interfaces";
import {API_URL} from "../const";
import dayjs from "dayjs";
import {Result, err, ok} from "neverthrow";
import {FetchAllUsersResponse, SendLoginToServerResponse} from "../interfaces/res-res.ts";


export async function sendRegisterToServer(
    formData: RegisterFormData
): Promise<Result<string, string>> {
    try {
        const paramsToSend = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            dateOfBirth: dayjs(formData.dateOfBirth).toISOString(),
            country: formData.country,
        };

        const response: AxiosResponse<string> = await axios.post(
            `${API_URL}/register`,
            paramsToSend,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return ok(response.data);
    } catch (error: any) {
        // If an error occurs, check if it's an AxiosError
        if (axios.isAxiosError(error)) {
            // Extract the error message from the response data
            const errorMessage = error.response?.data;
            console.error("Error message:", errorMessage);
            return err(errorMessage); // You can rethrow the error or handle it as needed
        } else {
            console.error("Unexpected error:", error.message);
            return err("An unexpected error occurred");
        }
    }
}


export async function sendLoginToServer(
    userName: string,
    password: string
): Promise<Result<SendLoginToServerResponse, string>> {
    try {
        const paramsToSend = {
            name: userName,
            password: password,
        };
        const response: AxiosResponse<SendLoginToServerResponse> = await axios.post(
            `${API_URL}/login`,
            paramsToSend,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("Response:", response.data);

        return ok(response.data);
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            // Extract the error message from the response
            const errorMessage = error.response?.data || "Unknown error";

            console.error("Error sending login request:", errorMessage);

            // Return error result with the extracted error message
            return err(errorMessage);
        } else {
            // Handle non-Axios errors
            console.error("Non-Axios error occurred:", error.message);

            // Return error result with the error message
            return err(error.message);
        }
    }
}

export async function fetchAllUsers(): Promise<Result<UserResponse[], string>> {
    try {
        const response: AxiosResponse<FetchAllUsersResponse> = await axios.get(
            `${API_URL}/users`
        );

        return ok(response.data.users);
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data || "Unknown error";
            console.error("Error fetching users:", errorMessage);
            return err(errorMessage);
        } else {
            console.error("Non-Axios error occurred:", error.message);
            return err(error.message);
        }
    }
}

export async function fetchIsServerAlive(): Promise<Result<boolean, string>> {
    try {
        const response: AxiosResponse<string> = await axios.get(`${API_URL}/`);

        return ok(response.data === "Alive!");
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data || "Unknown error";

            console.error("Error fetching server status:", errorMessage);

            return err(errorMessage);
        } else {
            console.error("Non-Axios error occurred:", error.message);

            return err(error.message);
        }
    }
}
