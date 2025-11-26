import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Permission {
    id: number;
    name: string;
    description: string;
    category: string;
}

interface Role {
    id: number;
    name: string;
    permissions: number[];
}

@Component({
    selector: 'app-permissions',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './permissions.html',
    styleUrls: ['./permissions.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsComponent {
    permissions = signal<Permission[]>([
        { id: 1, name: 'View Users', description: 'Can view user list and details', category: 'Users' },
        { id: 2, name: 'Create User', description: 'Can create new users', category: 'Users' },
        { id: 3, name: 'Edit User', description: 'Can edit user information', category: 'Users' },
        { id: 4, name: 'Delete User', description: 'Can delete users', category: 'Users' },
        { id: 5, name: 'View Reports', description: 'Can view system reports', category: 'Reports' },
        { id: 6, name: 'Create Reports', description: 'Can create new reports', category: 'Reports' },
        { id: 7, name: 'System Settings', description: 'Can modify system settings', category: 'System' },
        { id: 8, name: 'Manage Roles', description: 'Can manage user roles', category: 'System' },
    ]);

    roles = signal<Role[]>([
        { id: 1, name: 'Admin', permissions: [1, 2, 3, 4, 5, 6, 7, 8] },
        { id: 2, name: 'Editor', permissions: [1, 5, 6] },
        { id: 3, name: 'Viewer', permissions: [1, 5] },
    ]);

    selectedRole = signal<Role | null>(null);

    selectRole(role: Role) {
        this.selectedRole.set(role);
    }

    togglePermission(permissionId: number) {
        const role = this.selectedRole();
        if (!role) return;

        const permissions = role.permissions;
        const index = permissions.indexOf(permissionId);

        if (index > -1) {
            permissions.splice(index, 1);
        } else {
            permissions.push(permissionId);
        }

        this.roles.update(roles =>
            roles.map(r => r.id === role.id ? { ...r, permissions: [...permissions] } : r)
        );
        this.selectedRole.set({ ...role, permissions: [...permissions] });
    }

    hasPermission(permissionId: number): boolean {
        return this.selectedRole()?.permissions.includes(permissionId) ?? false;
    }

    saveChanges() {
        // TODO: Save role permissions to backend
        alert('Permissions updated successfully!');
    }
}
