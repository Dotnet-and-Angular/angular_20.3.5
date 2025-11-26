import { AdminState } from './admin.interface';

export const initialAdminState: AdminState = {
    users: [
        { id: 1, username: 'john_doe', email: 'john@example.com', role: 'user', status: 'active', joinDate: '2024-01-15' },
        { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'admin', status: 'active', joinDate: '2024-01-20' },
        { id: 3, username: 'bob_wilson', email: 'bob@example.com', role: 'user', status: 'inactive', joinDate: '2024-02-10' },
    ],
    permissions: [
        { id: 1, name: 'View Users', description: 'Can view user list and details', category: 'Users' },
        { id: 2, name: 'Create User', description: 'Can create new users', category: 'Users' },
        { id: 3, name: 'Edit User', description: 'Can edit user information', category: 'Users' },
        { id: 4, name: 'Delete User', description: 'Can delete users', category: 'Users' },
        { id: 5, name: 'View Reports', description: 'Can view system reports', category: 'Reports' },
        { id: 6, name: 'Create Reports', description: 'Can create new reports', category: 'Reports' },
        { id: 7, name: 'System Settings', description: 'Can modify system settings', category: 'System' },
        { id: 8, name: 'Manage Roles', description: 'Can manage user roles', category: 'System' },
    ],
    roles: [
        { id: 1, name: 'Admin', permissions: [1, 2, 3, 4, 5, 6, 7, 8] },
        { id: 2, name: 'Editor', permissions: [1, 5, 6] },
        { id: 3, name: 'Viewer', permissions: [1, 5] },
    ],
    analyticsData: {
        totalUsers: 1250,
        activeUsers: 847,
        newUsersThisMonth: 145,
        systemUptime: '99.8%',
        averageResponseTime: '245ms',
        systemLoad: '34%'
    },
    userActivityData: [
        { label: 'Mon', value: 120 },
        { label: 'Tue', value: 190 },
        { label: 'Wed', value: 150 },
        { label: 'Thu', value: 220 },
        { label: 'Fri', value: 280 },
        { label: 'Sat', value: 190 },
        { label: 'Sun', value: 130 },
    ],
    roleDistribution: [
        { label: 'Admin', value: 25 },
        { label: 'Editor', value: 150 },
        { label: 'Viewer', value: 1075 },
    ],
    loading: false,
    error: null
};
