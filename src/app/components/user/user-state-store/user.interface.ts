import { IUser } from "../dashboard/interface/person";

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
    persons?: IUser[];
    profile?: UserProfile;
    analytics?: UserAnalyticsData;
}

export interface authToken {
    token: string;
    role?: string;
}