import { Component, OnInit, signal } from '@angular/core';
import { Person } from '../../../services/person/person';
import { IPerson } from "./interface/person";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [ReactiveFormsModule]
})
export class Dashboard implements OnInit {
  people = signal<IPerson[]>([]);
  showAdd = signal(false);

  addPersonForm = signal(new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    age: new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(120)])
  }));

  constructor(private person: Person) { }

  ngOnInit(): void {
    this.person.all().subscribe({
      next: (data: IPerson[]) => this.people.set(data),
      error: (err) => console.error('Failed to load people', err)
    });
  }

  onAddSubmit() {
    if (!this.addPersonForm().valid) {
      return;
    }
    const dto: Partial<IPerson> = {
      name: this.addPersonForm().get('name')?.value ?? undefined,
      email: this.addPersonForm().get('email')?.value ?? undefined,
      phone: this.addPersonForm().get('phone')?.value ?? undefined,
      age: this.addPersonForm().get('age')?.value ?? undefined
    };

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
}
