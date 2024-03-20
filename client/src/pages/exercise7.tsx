import React, {useState} from 'react';
import {fetchAllUsers, fetchIsServerAlive, sendRegisterToServer} from "../requests";
import COUNTRIES from "../const/countries.ts";
import {faker} from "@faker-js/faker";
import {UserResponse} from "../interfaces";
import {useQuery} from "@tanstack/react-query";
import {API_URL} from "../const";

const Exercise7: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        country: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const {
        data: registeredUsers = [],
        refetch: refetchRegisteredUsers,
    } = useQuery({
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false,
        queryKey: ["registeredUsers"],
        queryFn: async (): Promise<UserResponse[]> => {
            const res = await fetchAllUsers();
            if (res.isErr()) {
                setError("Failed to fetch users.");
                return [];
            }
            return res.value;
        },
    });

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
                setError('');
                return false;
            }
            return res.value;
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleAutofill = () => {
        const startDate = new Date('1950-01-01');
        const endDate = new Date('2000-01-01');
        const randomDate = faker.date.between(startDate, endDate);

        setFormData({
            name: faker.internet.userName(),
            dateOfBirth: randomDate.toISOString().slice(0, 10),
            country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
            email: faker.internet.email(),
            password: faker.internet.password(),
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await sendRegisterToServer(formData);
            if (res.isErr()) {
                setError(res.error);
                return;
            }
            alert('User registered successfully.');
            setFormData({
                name: '',
                dateOfBirth: '',
                country: '',
                email: '',
                password: '',
            });
            setError('');
            refetchRegisteredUsers();
        } catch (error) {
            setError('Error registering user.');
            console.error(error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (serverLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (serverError) {
        return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
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
        <div className="flex flex-row">
            <div className="p-4 bg-gray-100">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Register</h2>
                <form onSubmit={handleSubmit} className="">
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-800">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-800">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-800">Country</label>
                        <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="form-select mt-1 block"
                            required
                        >
                            <option value="">Select your country</option>
                            {COUNTRIES.map((c) => {
                                return <option key={c} value={c}>{c}</option>;
                            })}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-800">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block mb-2 text-gray-800">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="input pr-10"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="ml-2 p-2 bg-gray-200 text-gray-600 text-sm rounded-md"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={handleAutofill}
                            className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 p-2 rounded-md"
                        >
                            Autofill
                        </button>
                        <button type="submit"
                                className="btn bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md">Register
                        </button>
                    </div>
                </form>
            </div>
            {/* Display registered users on the right */}
            <UserList users={registeredUsers}/>
        </div>
    );
};


interface UserListProps {
    users: UserResponse[];
}

function UserList({users}: UserListProps) {
    return (
        <div className="ml-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Registered Users</h2>
            <div className="grid gap-4">
                {users.map((user, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Exercise7;
