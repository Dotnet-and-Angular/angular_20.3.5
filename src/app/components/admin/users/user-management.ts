import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface User {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
    joinDate: string;
}

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './user-management.html',
    styleUrls: ['./user-management.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent {
    users = signal<User[]>([
        { id: 1, username: 'john_doe', email: 'john@example.com', role: 'user', status: 'active', joinDate: '2024-01-15' },
        { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'admin', status: 'active', joinDate: '2024-01-20' },
        { id: 3, username: 'bob_wilson', email: 'bob@example.com', role: 'user', status: 'inactive', joinDate: '2024-02-10' },
    ]);

    searchQuery = signal('');
    filteredUsers = signal<User[]>(this.users());

    onSearch(query: string) {
        this.searchQuery.set(query);
        this.filteredUsers.set(
            this.users().filter(u =>
                u.username.toLowerCase().includes(query.toLowerCase()) ||
                u.email.toLowerCase().includes(query.toLowerCase())
            )
        );
    }

    toggleUserStatus(userId: number) {
        const users = this.users();
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex > -1) {
            users[userIndex].status = users[userIndex].status === 'active' ? 'inactive' : 'active';
            this.users.set([...users]);
            this.onSearch(this.searchQuery());
        }
    }

    deleteUser(userId: number) {
        this.users.set(this.users().filter(u => u.id !== userId));
        this.onSearch(this.searchQuery());
    }
}
