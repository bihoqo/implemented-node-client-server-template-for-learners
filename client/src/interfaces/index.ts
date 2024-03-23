export interface ExerciseInfo {
    path: string
    subject: string
}

export interface RegisterFormData {
    dateOfBirth: string;
    country: string;
    password: string;
    name: string;
    email: string
}

export interface UserResponse {
    name: string;
    email: string;
    dateOfBirth: Date;
    country: string;
    _id: string;
}
