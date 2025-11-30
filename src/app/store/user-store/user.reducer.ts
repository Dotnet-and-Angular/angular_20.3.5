import { createReducer, on } from "@ngrx/store";
import { initialState, initialAuthToken } from "./user.state";
import { setToken, getToken, logout, createUser, setUser, loadPersonsSuccess } from "./user.actions";


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
            username: action.username,
            role: action.role,
            profile: action.profile || null,
            isNewUser: action.isNewUser || false,
            profileData: action.profileData || null,
        }
    }),
    on(createUser, (state, action) => {
        return {
            ...state,
            username: action.usernameOrEmail,
            role: action.role,
        }
    }),
    on(loadPersonsSuccess, (state, action) => {
        return {
            ...state,
            persons: action.persons,
        }
    }),
);
