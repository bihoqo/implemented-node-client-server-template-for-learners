export interface SignData {
    userId: string;
    name: string;
    email: string;
}

export interface UserResponse {
    name: string;
    email: string;
    dateOfBirth: Date;
    country: string;
    _id: string;
}
