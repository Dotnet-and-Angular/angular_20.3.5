
import { Component, inject, OnInit, signal, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Person } from '@services';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { loadPersons } from '@store/user';
import { selectPersons } from '@store/user';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '../dashboard/interface/person';
import { DataTableComponent, TableColumn } from '../../shared/data-table';
import { CommonModule } from '@angular/common';
import { USER_MESSAGES } from '@constants';

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
  private destroy$ = new Subject<void>();

  people$ = this.store.pipe(select(selectPersons));
  showAdd = signal(false);
  selectedRow = signal<IUser | null>(null);
  labels = USER_MESSAGES.USERDATA;

  tableColumns: TableColumn[] = [
    { key: 'id', label: this.labels.ID, sortable: true, width: '80px' },
    { key: 'name', label: this.labels.NAME, sortable: true, width: '200px' },
    { key: 'age', label: this.labels.AGE, sortable: true, width: '100px', format: (v: any) => v ? v.toString() : '-' },
    { key: 'email', label: this.labels.EMAIL_LABEL, sortable: true, width: '250px', format: (v: any) => v || '-' },
    { key: 'phone', label: this.labels.PHONE_LABEL, sortable: false, width: '150px', format: (v: any) => v || '-' }
  ];

  addPersonForm = signal(new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    age: new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(120)])
  }));

  constructor(private person: Person) { }

  ngOnInit(): void {
    this.store.dispatch(loadPersons());
  }

  onAddSubmit() {
    if (!this.addPersonForm().valid) {
      return;
    }
    const dto = this.addPersonForm().value as { name: string; email: string; phone: string; age: number };

    this.person.create(dto).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.store.dispatch(loadPersons());
        this.addPersonForm().reset({ name: '', email: '', phone: '', age: null });
        this.showAdd.set(false);
      }
    });
  }

  onRowSelected(row: IUser): void {
    this.selectedRow.set(row);
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
