import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { USER_MESSAGES } from '@constants';
import { GLOBAL_MESSAGES } from '@constants';

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
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-profile.html',
    styleUrl: './edit-profile.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent {
    labels = USER_MESSAGES.PROFILE;
    common = GLOBAL_MESSAGES.COMMON;
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

    successMessage = '';

    onSubmit() {
        this.successMessage = this.labels.UPDATE_SUCCESS;
        setTimeout(() => {
            this.successMessage = '';
        }, 3000);
    }

    onCancel() {
        this.successMessage = '';
    }
}
