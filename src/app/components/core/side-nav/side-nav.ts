import { CommonModule } from "@angular/common";
import { Component, inject } from '@angular/core';
import { MaterialModule } from '@Material';
import { SIDENAV_ITEMS, SidenavItem } from './side-nav-list';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-side-nav',
  imports: [RouterModule, CommonModule, MaterialModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  private router = inject(Router);
  drawerOpened = true;
  sidenavItems: SidenavItem[] = [];
  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
    this.sidenavItems = SIDENAV_ITEMS;
  }
  trackBySidenavItem(index: number, item: SidenavItem): string {
    console.log(item);

    return item.id;
  }

  trackBySidenavChildItem(index: number, item: SidenavItem): string {
    return item.id;
  }
  logout() {
    this.router.navigate(['/login']);
    console.log('User logged out successfully');

  }
}
