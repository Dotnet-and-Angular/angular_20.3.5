import { Component, OnInit, inject, ChangeDetectionStrategy, signal } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ADMIN_MESSAGES } from '@constants';
import * as AdminActions from '@store/admin';
import * as AdminSelectors from '@store/admin';
import { Admin } from '@interfaces';
import { DataTableComponent, TableColumn, SvgIconComponent } from '@shared';

@Component({
    selector: 'app-admin-management',
    standalone: true,
    imports: [ReactiveFormsModule, DataTableComponent, SvgIconComponent],
    templateUrl: './admin-management.html',
    styleUrls: ['./admin-management.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminManagementComponent implements OnInit {
    private store = inject(Store);

    admins = this.store.selectSignal(AdminSelectors.selectAllAdmins);
    loading = this.store.selectSignal(AdminSelectors.selectAdminLoading);
    error = this.store.selectSignal(AdminSelectors.selectAdminError);

    showForm = signal(false);
    isEditMode = signal(false);
    searchQuery = signal('');
    selectedAdmin = signal<Admin | null>(null);

    labels = ADMIN_MESSAGES.ADMIN_MANAGEMENT;
    roleOptions = ADMIN_MESSAGES.ROLE_OPTIONS
    statusOptions = ADMIN_MESSAGES.STATUS_OPTIONS;

    tableColumns: TableColumn[] = [
        { key: 'username', label: 'Username', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'role', label: 'Role', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'joinDate', label: 'Join Date', sortable: true }
    ];

    adminForm = signal(new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        role: new FormControl('admin', [Validators.required]),
        status: new FormControl('active', [Validators.required])
    }));

    ngOnInit(): void {
        // Only trigger load when we don't already have admins cached in the store
        if (!this.admins || !this.admins() || this.admins().length === 0) {
            this.store.dispatch(AdminActions.loadAdmins());
        }
    }

    onSearch(): void {
        const query = this.searchQuery();
        if (!query.trim()) {
            this.store.dispatch(AdminActions.loadAdmins());
            return;
        }

        this.store.dispatch(AdminActions.searchAdmins({ username: query }));
    }

    clearError(): void {
        // Error is managed by the store, so we just need to clear the local signal
        // The store will handle clearing the error on next action
    }

    onSearchInputChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.searchQuery.set(target.value);
    }

    onAddAdmin(): void {
        this.isEditMode.set(false);
        this.selectedAdmin.set(null);
        this.adminForm().reset({ role: 'admin', status: 'active' });
        this.showForm.set(true);
    }

    onEditAdmin(admin: Admin): void {
        this.isEditMode.set(true);
        this.selectedAdmin.set(admin);
        this.adminForm().patchValue(admin);
        this.showForm.set(true);
    }

    onDeleteAdmin(admin: Admin): void {
        if (confirm(`Delete admin ${admin.username}?`)) {
            if (admin.id) {
                this.store.dispatch(AdminActions.deleteAdmin({ id: admin.id }));
            }
        }
    }

    onSaveAdmin(): void {
        if (!this.adminForm().valid) {
            return;
        }

        const formData = this.adminForm().value;
        const adminData: Admin = {
            username: formData.username || '',
            email: formData.email || '',
            role: (formData.role || 'admin') as Admin['role'],
            status: (formData.status || 'active') as Admin['status']
        };

        if (this.isEditMode()) {
            const adminId = this.selectedAdmin()?.id;
            if (adminId) {
                this.store.dispatch(AdminActions.updateAdmin({
                    id: adminId,
                    admin: adminData
                }));
                this.showForm.set(false);
                this.adminForm().reset();
            }
        } else {
            this.store.dispatch(AdminActions.registerAdmin({
                admin: adminData
            }));
            this.showForm.set(false);
            this.adminForm().reset();
        }
    }

    onCancel(): void {
        this.showForm.set(false);
        this.adminForm().reset();
    }

    onRowSelected(admin: Admin): void {
        this.selectedAdmin.set(admin);
    }

    trackByAdminId(index: number, admin: Admin): number | undefined {
        return admin.id;
    }
}

