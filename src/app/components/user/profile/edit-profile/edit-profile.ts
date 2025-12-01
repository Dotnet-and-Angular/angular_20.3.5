import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { USER_MESSAGES, ROLES } from '@constants';
import { GLOBAL_MESSAGES } from '@constants';
import { selectUserRole } from '@store/user';
import { toSignal } from '@angular/core/rxjs-interop';

interface ProfileFormData {
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    phone: string;
    location: string;
    website: string;
    department: string;
    role: string;
    skills: string;
}

@Component({
    selector: 'app-edit-profile',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './edit-profile.html',
    styleUrl: './edit-profile.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent implements OnInit {
    private store = inject(Store);
    private router = inject(Router);

    labels = USER_MESSAGES.PROFILE;
    common = GLOBAL_MESSAGES.COMMON;
    roles = ROLES;

    userRole = toSignal(this.store.pipe(select(selectUserRole)), { initialValue: 'user' });
    successMessage = signal('');

    // Only show role field for admins
    showRoleField = computed(() => this.userRole() === 'admin');

    ngOnInit() {
        // Only admins can edit profiles
        if (this.userRole() !== 'admin') {
            this.router.navigate(['/user/profile/view']);
        }
    }

    formData: ProfileFormData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        bio: 'Senior Software Developer',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        website: 'https://johndoe.com',
        department: 'Engineering',
        role: 'admin',
        skills: 'Angular, TypeScript, SCSS, Node.js'
    };

    onSubmit() {
        this.successMessage.set(this.labels.UPDATE_SUCCESS);
        setTimeout(() => {
            this.successMessage.set('');
        }, 3000);
    }

    onCancel() {
        this.successMessage.set('');
    }
}
