import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { selectAllPermissions, selectAllRoles, selectPermissionsByCategory } from '../admin-store/admin.selector';
import * as AdminActions from '../admin-store/admin.actions';
import { Permission, Role } from '../admin-store/admin.interface';

@Component({
    selector: 'app-permissions',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './permissions.html',
    styleUrls: ['./permissions.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsComponent {
    private store = inject(Store);

    permissions$ = this.store.pipe(select(selectAllPermissions));
    roles$ = this.store.pipe(select(selectAllRoles));
    selectedRole = signal<Role | null>(null);

    selectRole(role: Role) {
        this.selectedRole.set(role);
    }

    togglePermission(permissionId: number) {
        const role = this.selectedRole();
        if (!role) return;

        const permissions = role.permissions.includes(permissionId)
            ? role.permissions.filter(p => p !== permissionId)
            : [...role.permissions, permissionId];

        this.store.dispatch(AdminActions.updateRolePermissions({ roleId: role.id, permissions }));
        this.selectedRole.set({ ...role, permissions });
    }

    hasPermission(permissionId: number): boolean {
        return this.selectedRole()?.permissions.includes(permissionId) ?? false;
    }

    saveChanges() {
        const role = this.selectedRole();
        if (role) {
            this.store.dispatch(AdminActions.updateRolePermissions({ roleId: role.id, permissions: role.permissions }));
            alert('Permissions updated successfully!');
        }
    }
}
