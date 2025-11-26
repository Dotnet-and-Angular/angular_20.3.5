
export interface User {
    username: string;
    role: string;
}

export interface authToken {
    token: string;
    role?: string;
}