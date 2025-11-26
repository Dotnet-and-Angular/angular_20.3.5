import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { selectAnalyticsStats } from '../user-state-store/user.selector';
import { USER_MESSAGES } from '../../../constants/user-messages';

@Component({
    selector: 'app-analytics',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './analytics.html',
    styleUrl: './analytics.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent {
    private store = inject(Store);
    stats$ = this.store.pipe(select(selectAnalyticsStats));
    labels = USER_MESSAGES.ANALYTICS;
}
