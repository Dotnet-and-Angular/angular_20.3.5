import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { USER_MESSAGES } from '@constants';
import { selectUserRole } from '@store/user';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterModule, RouterLink],
    templateUrl: './profile.html',
    styleUrl: './profile.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
    private router = inject(Router);
    private store = inject(Store);
    labels = USER_MESSAGES.PROFILE;

    // Determine if we're in admin or user context based on current URL
    baseRoute = computed(() => {
        const url = this.router.url;
        return url.startsWith('/admin') ? '/admin' : '/user';
    });

    // Get current user role
    userRole = toSignal(this.store.pipe(select(selectUserRole)), { initialValue: 'user' });

    // Only admins can edit profiles
    canEdit = computed(() => this.userRole() === 'admin');
}
