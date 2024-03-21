import {useState} from "react";
import {UserResponse} from "../interfaces";

export interface UserToken {
    token: string;
    user: UserResponse;
}

export default function useToken() {
    const [userToken, setUserToken] = useState<UserToken | null>(getToken());

    function getToken(): UserToken | null {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) return null;
        const userToken: UserToken = JSON.parse(tokenString);
        return userToken;
    }

    function saveToken(userToken: UserToken) {
        localStorage.setItem("token", JSON.stringify(userToken));
        setUserToken(userToken);
    }

    function removeToken() {
        localStorage.removeItem("token");
        setUserToken(null);
    }

    return {
        setUserToken: saveToken,
        userToken: userToken,
        removeToken: removeToken,
    };
}
