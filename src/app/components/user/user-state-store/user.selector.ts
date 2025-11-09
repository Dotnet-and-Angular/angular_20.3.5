import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authToken, newUser } from "./user.interface";


const selectUserState = createFeatureSelector<newUser>('users');
const selectAuthToken = createFeatureSelector<authToken>('accessToken');


export const selectUser = createSelector(selectUserState, (state) => state);
export const getAuthToken = createSelector(selectAuthToken, (state) => state.token);
