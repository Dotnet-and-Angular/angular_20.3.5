import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AnalyticsData {
    totalUsers: number;
    activeUsers: number;
    newUsersThisMonth: number;
    systemUptime: string;
    averageResponseTime: string;
    systemLoad: string;
}

interface ChartData {
    label: string;
    value: number;
}

@Component({
    selector: 'app-admin-analytics',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-analytics.html',
    styleUrls: ['./admin-analytics.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminAnalyticsComponent {
    analyticsData = signal<AnalyticsData>({
        totalUsers: 1250,
        activeUsers: 847,
        newUsersThisMonth: 145,
        systemUptime: '99.8%',
        averageResponseTime: '245ms',
        systemLoad: '34%'
    });

    userActivityData = signal<ChartData[]>([
        { label: 'Mon', value: 120 },
        { label: 'Tue', value: 190 },
        { label: 'Wed', value: 150 },
        { label: 'Thu', value: 220 },
        { label: 'Fri', value: 280 },
        { label: 'Sat', value: 190 },
        { label: 'Sun', value: 130 },
    ]);

    roleDistribution = signal<ChartData[]>([
        { label: 'Admin', value: 25 },
        { label: 'Editor', value: 150 },
        { label: 'Viewer', value: 1075 },
    ]);

    getMaxValue(data: ChartData[]): number {
        return Math.max(...data.map(d => d.value));
    }

    getPercentage(value: number, max: number): number {
        return (value / max) * 100;
    }
}
