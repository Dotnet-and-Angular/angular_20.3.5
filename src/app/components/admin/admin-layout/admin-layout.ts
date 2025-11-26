import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../../core/header/header';
import { SideNav } from '../../core/side-nav/side-nav';
import { ADMIN_MESSAGES } from '../../../constants/admin-messages';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [Header, SideNav, RouterModule, CommonModule],
    templateUrl: './admin-layout.html',
    styleUrls: ['./admin-layout.scss']
})
export class AdminLayout {
    sideNavOpen = signal(true);
    labels = ADMIN_MESSAGES.LAYOUT;

    toggleSideNav(): void {
        this.sideNavOpen.update(state => !state);
    }
}
