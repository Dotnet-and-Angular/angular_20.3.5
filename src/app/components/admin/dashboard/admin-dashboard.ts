import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../../user/user-state-store/user.selector';
import { ADMIN_MESSAGES } from '../../../constants/admin-messages';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './admin-dashboard.html',
    styleUrls: ['./admin-dashboard.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent {
    private store = inject(Store);
    userRole$ = this.store.pipe(select(selectUser));
    labels = ADMIN_MESSAGES.DASHBOARD;
}
