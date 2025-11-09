
import { Component, inject, OnInit, signal } from '@angular/core';
import { Person } from '../../../services/person/person';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { loadPersons, loadPersonsSuccess } from '../user-state-store/user.actions';
import { Subject, takeUntil } from 'rxjs';
import { IPerson } from '../dashboard/interface/person';

@Component({
  selector: 'app-userdata',
  imports: [ReactiveFormsModule],
  templateUrl: './userdata.html',
  styleUrl: './userdata.scss',
})
export class Userdata {
  people = signal<IPerson[]>([]);
  showAdd = signal(false);
  private store = inject(Store);
  private destroy$ = new Subject<void>();

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


  trackById(index: number, item: IPerson) {
    return item.id;
  }

  onDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
