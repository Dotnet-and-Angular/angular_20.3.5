import { createReducer, on } from "@ngrx/store";
import { initialState, initialAuthToken, initialPersonState } from "./user.state";
import { setUser, setToken, getToken, logout, loadPersonsSuccess, loadPersons, loadPersonsFailure } from "./user.actions";
import { IPerson } from "../dashboard/interface/person";


export const storeReducer = createReducer(
    initialState,
    on(setUser, (state, action) => {

        // if (err.status === 409) {
        //   this.alreadyExists.set(true);
        //   this.form().get('username')?.setErrors({ conflict: true });
        //   return;
        // }

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

export const personReducers = createReducer(
    initialPersonState,
    on(loadPersons, (state) => ({
        ...state,
        persons: []
    })),
    on(loadPersonsSuccess, (state, action) => {
        return {
            ...state,
            persons: action.persons?.map(person => ({ ...person })) as IPerson[]
        }
    }),
    on(loadPersonsFailure, (state) => ({
        ...state,
        error: 'Failed to load persons'
    }))

);
