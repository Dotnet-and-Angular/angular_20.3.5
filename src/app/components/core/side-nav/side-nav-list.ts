export interface SidenavItem {
    id: string;
    icon: string;
    label: string;
    route: string;
    children?: SidenavItem[];
}

export const SIDENAV_ITEMS: SidenavItem[] = [
    { id: 'dashboard', icon: '', label: 'Dashboard', route: '/user/user-data' },
    // {
    //     id: 'user',
    //     icon: '',
    //     label: 'Users',
    //     route: '/user/user-data',
    //     children: [
    //         { id: 'users', icon: '', label: 'Users', route: '/user-data' },
    //     ],
    // },
];