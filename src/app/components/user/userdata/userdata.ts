
import { Component, inject, OnInit, signal, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AdminService } from '@services';
import { IUser } from '@interfaces';
import { DataTableComponent, TableColumn } from '@shared';
import { USER_MESSAGES } from '@constants';
import * as AdminActions from '@store/admin';
import * as AdminSelectors from '@store/admin';

@Component({
  selector: 'app-userdata',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent, CommonModule],
  templateUrl: './userdata.html',
  styleUrl: './userdata.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Userdata implements OnInit, OnDestroy {
  private store = inject(Store);
  private adminService = inject(AdminService);
  private destroy$ = new Subject<void>();

  people$ = this.store.selectSignal(AdminSelectors.selectAllUsers);
  showAdd = signal(false);
  selectedRow = signal<IUser | null>(null);
  labels = USER_MESSAGES.USERDATA;

  tableColumns: TableColumn[] = [
    { key: 'id', label: this.labels.ID, sortable: true, width: '80px' },
    { key: 'username', label: this.labels.NAME, sortable: true, width: '200px' },
    { key: 'email', label: this.labels.EMAIL_LABEL, sortable: true, width: '250px', format: (v: any) => v || '-' },
    { key: 'role', label: 'Role', sortable: true, width: '100px' },
    { key: 'status', label: 'Status', sortable: false, width: '100px' }
  ];

  addPersonForm = signal(new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('user', Validators.required),
    status: new FormControl('active', Validators.required)
  }));

  ngOnInit(): void {
    // Don't dispatch loadUsers here - let user-management handle loading
    // Just use cached data from store
  }

  onAddSubmit() {
    if (!this.addPersonForm().valid) {
      return;
    }
    const formData = this.addPersonForm().value;
    const dto = {
      username: formData.username || '',
      email: formData.email || '',
      role: (formData.role || 'user') as 'user' | 'admin',
      status: (formData.status || 'active') as 'active' | 'inactive'
    };

    this.adminService.registerUser(dto).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.store.dispatch(AdminActions.loadUsers());
        this.addPersonForm().reset({ username: '', email: '', role: 'user', status: 'active' });
        this.showAdd.set(false);
      }
    });
  }

  onRowSelected(row: IUser): void {
    this.selectedRow.set(row);
  }

  onRowDoubleClick(row: IUser): void {
    // Handle double click
  }

  onRowDoubleClicked(row: IUser): void {
    // Handle double click
  }

  trackById(index: number, item: IUser) {
    return item.id;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
