import { createAction, props } from "@ngrx/store";
import { authToken, newUser } from "./user.interface";


export enum USER_ACTIONS {
    setUser = 'Create New User Action',

    // Auth Token Actions
    setToken = 'Set Auth Token Action',
    getToken = 'Get Auth Token Action',

    // Logout Action
    logout = 'Logout Action',

    // User Effects
    loadUser = 'Load User Action',
    loadUserSuccess = 'Load User Success Action',
    loadUserFailure = 'Load User Failure Action',
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