import { createReducer, on } from "@ngrx/store";
import { initialState, initialAuthToken } from "./user.state";
import { setToken, getToken, logout, createUser, setUser } from "./user.actions";
import { IUser } from "../dashboard/interface/person";


export const authTokenReducer = createReducer(
    initialAuthToken,
    on(setToken, (state, action) => {
        return {
            ...state,
            token: action.token,
            role: action.role,
        }
    }),
    on(getToken, (state) => {
        return {
            ...state,
            token: state.token,
        }
    }),
    on(logout, (state) => {
        return {
            ...state,
            token: '',
            role: '',
        }
    })
);

export const userReducer = createReducer(
    initialState,
    on(setUser, (state, action) => {
        return {
            ...state,
            name: action.username,
            role: action.role,
        }
    }),
    on(createUser, (state, action) => {
        return {
            ...state,
            name: action.username,
            role: action.role,
        }
    }),
);
