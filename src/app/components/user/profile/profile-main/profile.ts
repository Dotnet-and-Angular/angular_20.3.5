import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { USER_MESSAGES } from '@constants';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterModule, RouterLink],
    templateUrl: './profile.html',
    styleUrl: './profile.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
    labels = USER_MESSAGES.PROFILE;
}
