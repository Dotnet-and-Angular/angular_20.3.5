import { Component, ChangeDetectionStrategy, inject, computed, OnInit } from '@angular/core';

import { RouterModule, RouterLink, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { USER_MESSAGES } from '@constants';
import { selectUserRole } from '@store/user';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [RouterModule, RouterLink],
    templateUrl: './settings.html',
    styleUrl: './settings.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
    private router = inject(Router);
    private store = inject(Store);
    labels = USER_MESSAGES.SETTINGS;

    userRole = toSignal(this.store.pipe(select(selectUserRole)), { initialValue: 'user' });

    // Settings are user-only - redirect admins
    ngOnInit() {
        if (this.userRole() !== 'user') {
            this.router.navigate(['/admin']);
        }
    }

    // Determine if we're in user context based on current URL
    baseRoute = computed(() => {
        const url = this.router.url;
        return url.startsWith('/admin') ? '/admin' : '/user';
    });
}
