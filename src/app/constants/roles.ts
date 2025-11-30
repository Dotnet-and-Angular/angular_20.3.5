// Role definitions and options
export interface Role {
    value: string;
    label: string;
}

export const ROLES: Role[] = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
];

export const USER_ROLES: Role[] = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
];

export const STATUSES: Array<{ value: string; label: string }> = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
];
