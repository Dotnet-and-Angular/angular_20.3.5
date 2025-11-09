import { IPerson } from "../dashboard/interface/person";
import { authToken, newUser } from "./user.interface";


export const initialState: newUser = {
    username: 'John Doe',
    password: 'password123',
    confirmPassword: 'password123'
};

export const initialAuthToken: authToken = {
    token: ''
};

export const initialPersonState = {
    persons: [] as IPerson[]
};