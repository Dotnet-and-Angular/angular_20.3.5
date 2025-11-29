import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectUser } from '@store/user';
import * as AdminSelectors from '../admin-store/admin.selector';
import { ADMIN_MESSAGES } from '@constants';
import * as AdminActions from '../admin-store/admin.actions';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './admin-dashboard.html',
    styleUrls: ['./admin-dashboard.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent implements OnInit {
    private store = inject(Store);
    userRole$ = this.store.pipe(select(selectUser));
    admins = this.store.selectSignal(AdminSelectors.selectAllAdmins);
    labels = ADMIN_MESSAGES.DASHBOARD;

    ngOnInit(): void {
        // Load admin data when admin panel is accessed — only if not already loaded
        if (!this.admins || !this.admins() || this.admins().length === 0) {
            this.store.dispatch(AdminActions.loadAdmins());
        }
    }
}
