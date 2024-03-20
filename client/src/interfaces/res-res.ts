import {UserResponse} from "./index.ts";


export interface SendLoginToServerResponse {
    token: string;
    user: UserResponse;
}

export interface FetchAllUsersResponse {
    users: UserResponse[];
    timestamp: number;
}
