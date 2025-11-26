import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { selectAnalyticsData, selectUserActivityData, selectRoleDistribution } from '../admin-store/admin.selector';

@Component({
    selector: 'app-admin-analytics',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-analytics.html',
    styleUrls: ['./admin-analytics.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminAnalyticsComponent {
    private store = inject(Store);

    analyticsData$ = this.store.pipe(select(selectAnalyticsData));
    userActivityData$ = this.store.pipe(select(selectUserActivityData));
    roleDistribution$ = this.store.pipe(select(selectRoleDistribution));

    getMaxValue(data: any[]): number {
        return Math.max(...data.map(d => d.value));
    }

    getPercentage(value: number, max: number): number {
        return (value / max) * 100;
    }
}
