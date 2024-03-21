import {useState, FormEvent, ChangeEvent} from "react";
import {useNavigate} from "react-router-dom";
import {fetchIsServerAlive, sendLoginToServer} from "../requests/"
import useToken, {UserToken} from "../hooks/useToken";
import {useQuery} from "@tanstack/react-query";
import {API_URL} from "../const";

interface LoginFormProps {
    onSubmit: (username: string, password: string) => void;
    errorMessage?: string;
}

export default function ExerciseLoginPage() {
    const {setUserToken, userToken, removeToken} = useToken();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );


    const {
        data: isServerOn,
        isLoading: serverLoading,
        isError: serverError,
        refetch: refetchIsServerOn,
    } = useQuery({
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false,
        queryKey: ['serverStatus'],
        queryFn: async (): Promise<boolean> => {
            const res = await fetchIsServerAlive();
            if (res.isErr()) {
                setErrorMessage('');
                return false;
            }
            return res.value;
        },
    });

    const handleLogin = async (username: string, password: string) => {
        // Add your login authentication logic here
        const result = await sendLoginToServer(username, password);
        if (result.isOk()) {
            // Login successful
            console.log("Login successful");
            const tokenObject: UserToken = {
                user: result.value.user,
                token: result.value.token,
            };
            setUserToken(tokenObject);
            window.location.reload();
        } else {
            // Login failed
            console.log("Login failed");
            setErrorMessage(result.error);
        }
    };

    if (serverLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (serverError) {
        return <div className="flex items-center justify-center h-screen text-red-500">{errorMessage}</div>;
    }

    if (!isServerOn) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="mb-4 text-red-500">Server is not alive.</p>
                <p className="mb-4 text-red-500">Do not forget to turn {API_URL}.</p>
                <button onClick={() => refetchIsServerOn()}
                        className="btn bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md">Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            <LoginForm onSubmit={handleLogin} errorMessage={errorMessage}/>
            {userToken ? (
                <div className="flex items-center justify-center py-4 bg-amber-50 w-full">
                    <div>
                        <h1 className="text-xl font-semibold">Logged User:</h1>
                        <p className="mt-2">Name: {userToken.user.name}</p>
                        <p className="mt-2">Id: {userToken.user._id}</p>
                        <p className="mt-2">Email: {userToken.user.email}</p>
                        <p className="mt-2">Country: {userToken.user.country}</p>
                        <button
                            onClick={removeToken}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export function LoginForm({onSubmit, errorMessage}: LoginFormProps) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        // Navigate to the register page or show the register form
        console.log("Register clicked");
        navigate("/exercise7");
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(username, password);
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {errorMessage && (
                    <p className="text-red-500 text-center">{errorMessage}</p>
                )}
                <div className="text-center">
                    <p className="mt-2 text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={handleRegisterClick}
                        >
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
