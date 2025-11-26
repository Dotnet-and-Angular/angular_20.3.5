import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { USER_MESSAGES } from '@constants';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, RouterModule, RouterLink],
    templateUrl: './settings.html',
    styleUrl: './settings.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
    labels = USER_MESSAGES.SETTINGS;
}
