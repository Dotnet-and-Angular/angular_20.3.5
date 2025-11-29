import { createAction, props } from "@ngrx/store";
import { authToken } from "./user.interface";


export enum USER_ACTIONS {
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

    createUser = 'Create User Action',
    createUserSuccess = 'Create User Success Action',
    createUserFailure = 'Create User Failure Action',
}

// Auth Token Action Creators
export const setToken = createAction(USER_ACTIONS.setToken, props<authToken & { role?: string }>());
export const getToken = createAction(USER_ACTIONS.getToken);

// Logout Action
export const logout = createAction(USER_ACTIONS.logout);

// User Effects
export const loadUser = createAction(USER_ACTIONS.loadUser, props<{ usernameOrEmail: string; password: string; role: string }>());
export const loadUserSuccess = createAction(USER_ACTIONS.loadUserSuccess, props<{ action: any }>());
export const loadUserFailure = createAction(USER_ACTIONS.loadUserFailure, props<{ error: any }>());

// Users List Effects
export const loadPersons = createAction(USER_ACTIONS.loadPersons);
export const loadPersonsSuccess = createAction(USER_ACTIONS.loadPersonsSuccess, props<{ persons: any }>());
export const loadPersonsFailure = createAction(USER_ACTIONS.loadPersonsFailure, props<{ error: any }>());


// Set user state during login (no API call)
export const setUser = createAction('Set User Action', props<{ username: string; role: 'user' | 'admin' | 'editor' | 'viewer'; profile?: any; isNewUser?: boolean; profileData?: any }>());

// Create user with registration form
export const createUser = createAction(USER_ACTIONS.createUser, props<{
    usernameOrEmail: string;
    password: string;
    role: 'admin' | 'user' | 'editor' | 'viewer'
}>());
export const createUserSuccess = createAction(USER_ACTIONS.createUserSuccess, props<{ action: any }>());
export const createUserFailure = createAction(USER_ACTIONS.createUserFailure, props<{ error: any }>());