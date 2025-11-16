import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterModule, RouterLink],
    templateUrl: './profile.html',
    styleUrl: './profile.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent { }
