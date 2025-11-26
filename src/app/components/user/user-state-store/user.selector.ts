import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authToken, User } from "./user.interface";


const selectUserState = createFeatureSelector<User>('user');
const selectAuthToken = createFeatureSelector<authToken>('accessToken');


export const selectUser = createSelector(selectUserState, (state) => state);
export const getAuthToken = createSelector(selectAuthToken, (state) => state.token);
export const selectUserRole = createSelector(selectUserState, (state) => state?.role || 'user');
export const selectIsAdmin = createSelector(selectUserRole, (role) => role === 'admin');
export const selectIsUser = createSelector(selectUserRole, (role) => role === 'user');
