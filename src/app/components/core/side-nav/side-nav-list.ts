export interface SidenavItem {
    id: string;
    icon: string;
    label: string;
    route: string;
    children?: SidenavItem[];
}

export const SIDENAV_ITEMS: SidenavItem[] = [
    {
        id: 'dashboard',
        icon: '📊',
        label: 'Dashboard',
        route: '/user/user-data',
    },
    {
        id: 'analytics',
        icon: '📈',
        label: 'Analytics',
        route: '/user/analytics',
    },
    {
        id: 'profile',
        icon: '👤',
        label: 'Profile',
        route: '/user/profile',
        children: [
            {
                id: 'profile-view',
                icon: '👁️',
                label: 'View Profile',
                route: '/user/profile/view',
            },
            {
                id: 'profile-edit',
                icon: '✏️',
                label: 'Edit Profile',
                route: '/user/profile/edit',
            },
        ],
    },
    {
        id: 'settings',
        icon: '⚙️',
        label: 'Settings',
        route: '/user/settings',
        children: [
            {
                id: 'account-settings',
                icon: '👤',
                label: 'Account',
                route: '/user/settings/account',
            },
            {
                id: 'privacy-settings',
                icon: '🔒',
                label: 'Privacy',
                route: '/user/settings/privacy',
            },
            {
                id: 'notification-settings',
                icon: '🔔',
                label: 'Notifications',
                route: '/user/settings/notifications',
            },
        ],
    },
];