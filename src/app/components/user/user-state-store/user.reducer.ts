import { createReducer, on } from "@ngrx/store";
import { initialState, initialAuthToken } from "./user.state";
import { setUser, setToken, getToken, logout } from "./user.actions";


export const storeReducer = createReducer(
    initialState,
    on(setUser, (state, action) => {
        return {
            ...state,
            username: action.username,
            password: action.password,
            confirmPassword: action.confirmPassword,
        }
    }),
);

export const authTokenReducer = createReducer(
    initialAuthToken,
    on(setToken, (state, action) => {
        return {
            ...state,
            token: action.token,
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
        }
    })
);

