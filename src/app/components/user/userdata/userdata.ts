
import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { Person } from '../../../services/person/person';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { loadPersons, loadPersonsSuccess } from '../user-state-store/user.actions';
import { Subject, takeUntil } from 'rxjs';
import { IPerson } from '../dashboard/interface/person';
import { DataTableComponent, TableColumn } from '../../shared/data-table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userdata',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent, CommonModule],
  templateUrl: './userdata.html',
  styleUrl: './userdata.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Userdata {
  people = signal<IPerson[]>([]);
  showAdd = signal(false);
  selectedRow = signal<IPerson | null>(null);
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  tableColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Name', sortable: true, width: '200px' },
    { key: 'age', label: 'Age', sortable: true, width: '100px', format: (v: any) => v ? v.toString() : '-' },
    { key: 'email', label: 'Email', sortable: true, width: '250px', format: (v: any) => v || '-' },
    { key: 'phone', label: 'Phone', sortable: false, width: '150px', format: (v: any) => v || '-' }
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
    this.store.pipe(select(loadPersonsSuccess)).pipe(takeUntil(this.destroy$)).subscribe((state: any) => {
      this.people.set(state?.persons?.persons || []);
    });
  }

  onAddSubmit() {
    if (!this.addPersonForm().valid) {
      return;
    }
    const dto = this.addPersonForm().value as { name: string; email: string; phone: string; age: number };

    this.person.create(dto).subscribe({
      next: (created) => {
        this.people.update(list => [created, ...list]);
        // reset the form
        this.addPersonForm().reset({ name: '', email: '', phone: '', age: null });
        this.showAdd.set(false);
      },
      error: (err) => console.error('Failed to create person', err)
    });
  }

  onRowSelected(row: IPerson): void {
    this.selectedRow.set(row);
  }

  onRowDoubleClicked(row: IPerson): void {
    console.log('Row double clicked:', row);
  }

  trackById(index: number, item: IPerson) {
    return item.id;
  }

  onDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
