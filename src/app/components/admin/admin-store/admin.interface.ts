export interface User {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
    joinDate: string;
}

export interface Permission {
    id: number;
    name: string;
    description: string;
    category: string;
}

export interface Role {
    id: number;
    name: string;
    permissions: number[];
}

export interface ChartData {
    label: string;
    value: number;
}

export interface AnalyticsData {
    totalUsers: number;
    activeUsers: number;
    newUsersThisMonth: number;
    systemUptime: string;
    averageResponseTime: string;
    systemLoad: string;
}

export interface AdminState {
    users: User[];
    permissions: Permission[];
    roles: Role[];
    analyticsData: AnalyticsData;
    userActivityData: ChartData[];
    roleDistribution: ChartData[];
    loading: boolean;
    error: string | null;
}
