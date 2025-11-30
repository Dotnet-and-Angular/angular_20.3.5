import { Component, OnInit, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ADMIN_MESSAGES, ROLES, STATUSES } from '@constants';
import * as AdminActions from '@store/admin';
import * as AdminSelectors from '@store/admin';
import { User } from '@interfaces';
import { DataTableComponent, TableColumn, SvgIconComponent } from '@shared';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, DataTableComponent, SvgIconComponent],
    templateUrl: './user-management.html',
    styleUrls: ['./user-management.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent implements OnInit {
    private store = inject(Store);

    users = this.store.selectSignal(AdminSelectors.selectAllUsers);
    loading = this.store.selectSignal(AdminSelectors.selectAdminLoading);
    error = this.store.selectSignal(AdminSelectors.selectAdminError);

    showForm = signal(false);
    isEditMode = signal(false);
    searchQuery = signal('');
    selectedUser = signal<User | null>(null);

    labels = ADMIN_MESSAGES.USER_MANAGEMENT;
    adminLabels = ADMIN_MESSAGES.ADMIN_MANAGEMENT;
    roles = ROLES;
    statuses = STATUSES;

    userForm = signal(new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        role: new FormControl('user', [Validators.required]),
        status: new FormControl('active', [Validators.required])
    }));

    tableColumns: TableColumn[] = [
        { key: 'username', label: 'Username', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'role', label: 'Role', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'joinDate', label: 'Join Date', sortable: true }
    ];

    ngOnInit(): void {
        // Only load users if store doesn't already have them to avoid duplicate API calls
        try {
            const existing = this.users();
            if (!existing || existing.length === 0) {
                this.store.dispatch(AdminActions.loadUsers());
            }
        } catch (e) {
            // fallback: dispatch if anything goes wrong checking the signal
            this.store.dispatch(AdminActions.loadUsers());
        }
    }

    onSearch(): void {
        const query = this.searchQuery();
        if (!query.trim()) {
            this.store.dispatch(AdminActions.loadUsers());
            return;
        }

        this.store.dispatch(AdminActions.searchUsers({ username: query }));
    }

    onSearchInputChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.searchQuery.set(target.value);
    }

    onAddUser(): void {
        this.isEditMode.set(false);
        this.selectedUser.set(null);
        this.userForm().reset({ role: 'user', status: 'active' });
        this.showForm.set(true);
    }

    onEditUser(user: User): void {
        this.isEditMode.set(true);
        this.selectedUser.set(user);
        this.userForm().patchValue(user);
        this.showForm.set(true);
    }

    onDeleteUser(user: User): void {
        if (confirm(`Delete user ${user.username}?`)) {
            this.store.dispatch(AdminActions.deleteUser({ userId: user.id }));
        }
    }

    onToggleStatus(user: User): void {
        this.store.dispatch(AdminActions.toggleUserStatus({ userId: user.id }));
    }

    onSaveUser(): void {
        if (!this.userForm().valid) {
            return;
        }

        const formData = this.userForm().value;
        const userData: Partial<User> = {
            username: formData.username || '',
            email: formData.email || '',
            role: (formData.role || 'user') as 'admin' | 'user',
            status: (formData.status || 'active') as 'active' | 'inactive'
        };

        if (this.isEditMode()) {
            const userId = this.selectedUser()?.id;
            if (userId) {
                this.store.dispatch(AdminActions.updateUser({
                    id: userId,
                    user: userData
                }));
                this.showForm.set(false);
                this.userForm().reset();
            }
        } else {
            this.store.dispatch(AdminActions.registerUser({
                user: userData
            }));
            this.showForm.set(false);
            this.userForm().reset();
        }
    }

    onCancel(): void {
        this.showForm.set(false);
        this.userForm().reset();
    }

    onRowSelected(user: User): void {
        this.selectedUser.set(user);
    }

    onRowDoubleClick(user: User): void {
        this.onEditUser(user);
    }

    clearError(): void {
        // Error is managed by the store
    }

    trackByUserId(index: number, user: User): number {
        return user.id;
    }
}
