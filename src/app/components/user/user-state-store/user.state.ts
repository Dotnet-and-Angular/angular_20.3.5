import { IUser } from "../dashboard/interface/person";
import { authToken, User } from "./user.interface";


export const initialState: IUser = {
    id: 0,
    name: '',
    role: '',
    permissions: [] as string[]
};

export const initialAuthToken: authToken = {
    token: '',
    role: ''
};

