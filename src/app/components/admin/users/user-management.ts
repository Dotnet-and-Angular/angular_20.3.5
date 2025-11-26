import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectFilteredUsers, selectAllUsers } from '../admin-store/admin.selector';
import * as AdminActions from '../admin-store/admin.actions';
import { User } from '../admin-store/admin.interface';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './user-management.html',
    styleUrls: ['./user-management.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent {
    private store = inject(Store);

    searchQuery = signal('');
    users$ = this.store.pipe(select((state: any) => {
        const query = this.searchQuery();
        return selectFilteredUsers(query)(state);
    }));

    onSearch(query: string) {
        this.searchQuery.set(query);
    }

    toggleUserStatus(userId: number) {
        this.store.dispatch(AdminActions.toggleUserStatus({ userId }));
    }

    deleteUser(userId: number) {
        this.store.dispatch(AdminActions.deleteUser({ userId }));
    }
}
