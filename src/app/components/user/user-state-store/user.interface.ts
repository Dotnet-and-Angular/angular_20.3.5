import { IUser } from "../dashboard/interface/person";

export interface UserProfileData {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
    location?: string;
    department?: string;
    memberSince?: string;
    status?: string;
    lastLogin?: string;
    verified?: boolean;
}

export interface UserProfile {
    firstName: string;
    lastName: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    department: string;
    role: string;
    memberSince: string;
    status: string;
    lastLogin: string;
    verified: boolean;
}

export interface AnalyticsStat {
    label: string;
    value: string;
}

export interface ChartData {
    label: string;
    value: number;
}

export interface UserAnalyticsData {
    stats: AnalyticsStat[];
    userGrowth: ChartData[];
    performanceData: ChartData[];
}

export interface User {
    username: string;
    role: string;
    isNewUser?: boolean;
    permissions?: number[];
    persons?: IUser[];
    profile?: UserProfile;
    profileData?: UserProfileData;
    analytics?: UserAnalyticsData;
}

export interface authToken {
    token: string;
    role?: string;
}

export interface LoginResponse {
    token: string;
    role: string;
    isNewUser: boolean;
    profile: UserProfileData;
}