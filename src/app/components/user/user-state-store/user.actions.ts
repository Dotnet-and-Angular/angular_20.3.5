import { createAction, props } from "@ngrx/store";
import { authToken, newUser } from "./user.interface";
import { IPerson } from "../dashboard/interface/person";


export enum USER_ACTIONS {
    setUser = 'Create New User Action',

    // Auth Token Actions
    setToken = 'Set Auth Token Action',
    getToken = 'Get Auth Token Action',

    // Logout Action
    logout = 'Logout Action',

    // User login Effects
    loadUser = 'Load User Action',
    loadUserSuccess = 'Load User Success Action',
    loadUserFailure = 'Load User Failure Action',

    //users list effects
    loadPersons = 'Load Persons Action',
    loadPersonsSuccess = 'Load Persons Success Action',
    loadPersonsFailure = 'Load Persons Failure Action',
}

export const setUser = createAction(USER_ACTIONS.setUser, props<newUser>());

// Auth Token Action Creators
export const setToken = createAction(USER_ACTIONS.setToken, props<authToken>());
export const getToken = createAction(USER_ACTIONS.getToken);

// Logout Action
export const logout = createAction(USER_ACTIONS.logout);

// User Effects
export const loadUser = createAction(USER_ACTIONS.loadUser, props<{ username: string; password: string }>());
export const loadUserSuccess = createAction(USER_ACTIONS.loadUserSuccess, props<{ action: any }>());
export const loadUserFailure = createAction(USER_ACTIONS.loadUserFailure, props<{ error: any }>());

// Users List Effects
export const loadPersons = createAction(USER_ACTIONS.loadPersons);
export const loadPersonsSuccess = createAction(USER_ACTIONS.loadPersonsSuccess, props<{ persons: IPerson[] }>());
export const loadPersonsFailure = createAction(USER_ACTIONS.loadPersonsFailure, props<{ error: any }>());