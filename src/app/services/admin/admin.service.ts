import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, finalize } from 'rxjs/operators';
import { User, Permission, Role, AnalyticsData, ChartData } from '@interfaces';

interface Admin {
    id?: number;
    username: string;
    email: string;
    role: 'admin' | 'user' | 'editor' | 'viewer';
    status?: 'active' | 'inactive';
    joinDate?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private adminApiUrl = 'http://localhost:5297/api/admin';
    private userApiUrl = 'http://localhost:5297/api/user';
    private listAdminsInFlight$: Observable<Admin[]> | null = null;
    private listUsersInFlight$: Observable<User[]> | null = null;

    constructor(private http: HttpClient) { }

    // Admin Management APIs
    registerAdmin(admin: Admin): Observable<Admin> {
        return this.http.post<Admin>(`${this.adminApiUrl}/register`, admin);
    }

    getAdminById(id: number): Observable<Admin> {
        return this.http.get<Admin>(`${this.adminApiUrl}/get-admin/${id}`);
    }

    listAdmins(): Observable<Admin[]> {
        // If there's already an in-flight request for admins, return it
        if (this.listAdminsInFlight$) {
            return this.listAdminsInFlight$;
        }

        const request$ = this.http.get<Admin[]>(`${this.adminApiUrl}/list-all-admins`).pipe(
            shareReplay(1),
            finalize(() => {
                this.listAdminsInFlight$ = null;
            })
        );

        this.listAdminsInFlight$ = request$;
        return request$;
    }

    searchAdmin(username: string): Observable<Admin[]> {
        return this.http.get<Admin[]>(`${this.adminApiUrl}/search-admin?username=${username}`);
    }

    updateAdmin(id: number, admin: Admin): Observable<Admin> {
        return this.http.put<Admin>(`${this.adminApiUrl}/update-admin/${id}`, admin);
    }

    deleteAdmin(id: number): Observable<void> {
        return this.http.delete<void>(`${this.adminApiUrl}/delete-admin/${id}`);
    }

    // User Management APIs
    listUsers(): Observable<User[]> {
        // If there's already an in-flight request, return it
        if (this.listUsersInFlight$) {
            return this.listUsersInFlight$;
        }

        const request$ = this.http.get<User[]>(`${this.userApiUrl}/list-all-users`).pipe(
            // cache the result for multiple subscribers while request is in-flight
            shareReplay(1),
            finalize(() => {
                // clear the in-flight reference when completed or errored
                this.listUsersInFlight$ = null;
            })
        );

        this.listUsersInFlight$ = request$;
        return request$;
    }

    searchUser(username: string): Observable<User[]> {
        return this.http.get<User[]>(`${this.userApiUrl}/search-user?username=${username}`);
    }

    registerUser(user: Partial<User>): Observable<User> {
        return this.http.post<User>(`${this.userApiUrl}/add-user`, user);
    }

    updateUser(id: number, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.userApiUrl}/update-user/${id}`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.userApiUrl}/delete-user/${id}`);
    }

    toggleUserStatus(id: number): Observable<User> {
        return this.http.patch<User>(`${this.userApiUrl}/toggle-status/${id}`, {});
    }

    // Permissions Management
    getPermissions(): Observable<Permission[]> {
        return this.http.get<Permission[]>(`${this.adminApiUrl}/permissions`);
    }

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(`${this.adminApiUrl}/roles`);
    }

    updateRolePermissions(roleId: number, permissions: number[]): Observable<Role> {
        return this.http.put<Role>(`${this.adminApiUrl}/roles/${roleId}/permissions`, { permissions });
    }

    // Analytics
    getAnalytics(): Observable<AnalyticsData> {
        return this.http.get<AnalyticsData>(`${this.adminApiUrl}/analytics`);
    }

    getUserActivityData(): Observable<ChartData[]> {
        return this.http.get<ChartData[]>(`${this.adminApiUrl}/analytics/user-activity`);
    }

    getRoleDistribution(): Observable<ChartData[]> {
        return this.http.get<ChartData[]>(`${this.adminApiUrl}/analytics/role-distribution`);
    }
}

