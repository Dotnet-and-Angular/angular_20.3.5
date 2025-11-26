import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, Permission, Role, AnalyticsData, ChartData } from '../../components/admin/admin-store/admin.interface';
import { initialAdminState } from '../../components/admin/admin-store/admin.state';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = '/api/admin';

    constructor(private http: HttpClient) { }

    // User Management
    getUsers(): Observable<User[]> {
        // TODO: Replace with actual API call
        return of(initialAdminState.users);
    }

    addUser(user: User): Observable<User> {
        // TODO: Replace with actual API call
        return of(user);
    }

    updateUser(user: User): Observable<User> {
        // TODO: Replace with actual API call
        return of(user);
    }

    deleteUser(userId: number): Observable<void> {
        // TODO: Replace with actual API call
        return of(void 0);
    }

    // Permissions Management
    getPermissions(): Observable<Permission[]> {
        // TODO: Replace with actual API call
        return of(initialAdminState.permissions);
    }

    getRoles(): Observable<Role[]> {
        // TODO: Replace with actual API call
        return of(initialAdminState.roles);
    }

    updateRolePermissions(roleId: number, permissions: number[]): Observable<Role> {
        // TODO: Replace with actual API call
        return of({ id: roleId, name: '', permissions });
    }

    // Analytics
    getAnalytics(): Observable<AnalyticsData> {
        // TODO: Replace with actual API call
        return of(initialAdminState.analyticsData);
    }

    getUserActivityData(): Observable<ChartData[]> {
        // TODO: Replace with actual API call
        return of(initialAdminState.userActivityData);
    }

    getRoleDistribution(): Observable<ChartData[]> {
        // TODO: Replace with actual API call
        return of(initialAdminState.roleDistribution);
    }
}
