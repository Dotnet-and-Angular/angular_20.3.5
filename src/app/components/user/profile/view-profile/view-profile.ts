import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface UserData {
    firstName: string;
    lastName: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    department: string;
    role: string;
    memberSince: string;
    status: string;
    lastLogin: string;
    verified: boolean;
}

@Component({
    selector: 'app-view-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './view-profile.html',
    styleUrl: './view-profile.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewProfileComponent {
    userData: UserData = {
        firstName: 'John',
        lastName: 'Doe',
        bio: 'Senior Software Developer',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        department: 'Engineering',
        role: 'Administrator',
        memberSince: 'January 15, 2024',
        status: 'Active',
        lastLogin: '2 hours ago',
        verified: true
    };
}
