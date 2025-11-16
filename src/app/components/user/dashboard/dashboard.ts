import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Header } from '../../core/header/header';
import { SideNav } from '../../core/side-nav/side-nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [Header, SideNav, RouterModule, CommonModule]
})
export class Dashboard {
  sideNavOpen = signal(true);

  toggleSideNav(): void {
    this.sideNavOpen.update(state => !state);
  }
}

