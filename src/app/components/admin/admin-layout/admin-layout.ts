import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../../core/header/header';
import { SideNav } from '../../core/side-nav/side-nav';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [Header, SideNav, RouterModule, CommonModule],
    templateUrl: './admin-layout.html',
    styleUrls: ['./admin-layout.scss']
})
export class AdminLayout {
    sideNavOpen = signal(true);

    toggleSideNav(): void {
        this.sideNavOpen.update(state => !state);
    }
}
