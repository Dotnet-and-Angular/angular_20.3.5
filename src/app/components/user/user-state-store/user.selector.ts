import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authToken, userState } from "@interfaces";


const selectUserState = createFeatureSelector<userState>('user');
const selectAuthToken = createFeatureSelector<authToken>('accessToken');


export const selectUser = createSelector(selectUserState, (state) => state);
export const getAuthToken = createSelector(selectAuthToken, (state) => state.token);
export const selectUserRole = createSelector(selectUserState, (state) => state?.role || 'user');
export const selectIsAdmin = createSelector(selectUserRole, (role) => role === 'admin');
export const selectIsUser = createSelector(selectUserRole, (role) => role === 'user');
export const selectPersons = createSelector(selectUserState, (state) => state?.persons || []);
export const selectUserProfile = createSelector(selectUserState, (state) => state?.profile || null);
export const selectAnalyticsData = createSelector(selectUserState, (state) => state?.analytics || null);
export const selectAnalyticsStats = createSelector(selectAnalyticsData, (analytics) => analytics?.stats || []);
export const selectUserGrowth = createSelector(selectAnalyticsData, (analytics) => analytics?.userGrowth || []);
export const selectPerformanceData = createSelector(selectAnalyticsData, (analytics) => analytics?.performanceData || []);
