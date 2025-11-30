export interface SidenavItem {
    id: string;
    icon: string;
    label: string;
    route: string;
    requiredRole?: 'user' | 'admin';
    children?: SidenavItem[];
}

export const SIDENAV_ITEMS: SidenavItem[] = [
    {
        id: 'dashboard',
        icon: '📊',
        label: 'Dashboard',
        route: '/user/user-data',
        requiredRole: 'user',
    },
    {
        id: 'analytics',
        icon: '📈',
        label: 'Analytics',
        route: '/user/analytics',
        requiredRole: 'user',
    },
    {
        id: 'profile',
        icon: '👤',
        label: 'Profile',
        route: '/user/profile',
        requiredRole: 'user',
        children: [
            {
                id: 'profile-view',
                icon: '👁️',
                label: 'View Profile',
                route: '/user/profile/view',
                requiredRole: 'user',
            },
        ],
    },
    {
        id: 'settings',
        icon: '⚙️',
        label: 'Settings',
        route: '/user/settings',
        requiredRole: 'user',
        children: [
            {
                id: 'account-settings',
                icon: '👤',
                label: 'Account',
                route: '/user/settings/account',
                requiredRole: 'user',
            },
            {
                id: 'privacy-settings',
                icon: '🔒',
                label: 'Privacy',
                route: '/user/settings/privacy',
                requiredRole: 'user',
            },
            {
                id: 'notification-settings',
                icon: '🔔',
                label: 'Notifications',
                route: '/user/settings/notifications',
                requiredRole: 'user',
            },
        ],
    },
];

export const ADMIN_ITEMS: SidenavItem[] = [
    {
        id: 'admin-dashboard',
        icon: '🛡️',
        label: 'Admin Panel',
        route: '/admin',
        requiredRole: 'admin',
    },
    {
        id: 'admin-profile',
        icon: '👤',
        label: 'Profile',
        route: '/admin/profile',
        requiredRole: 'admin',
        children: [
            {
                id: 'admin-profile-view',
                icon: '👁️',
                label: 'View Profile',
                route: '/admin/profile/view',
                requiredRole: 'admin',
            },
            {
                id: 'admin-profile-edit',
                icon: '✏️',
                label: 'Edit Profile',
                route: '/admin/profile/edit',
                requiredRole: 'admin',
            },
        ],
    },
    {
        id: 'user-management',
        icon: '👥',
        label: 'User Management',
        route: '/admin/users',
        requiredRole: 'admin',
    },
    {
        id: 'admin-management',
        icon: '🔧',
        label: 'Admin Management',
        route: '/admin/admins',
        requiredRole: 'admin',
    },
    {
        id: 'permissions',
        icon: '🔐',
        label: 'Permissions',
        route: '/admin/permissions',
        requiredRole: 'admin',
    },
    {
        id: 'admin-analytics',
        icon: '📊',
        label: 'Analytics',
        route: '/admin/analytics',
        requiredRole: 'admin',
    },
];