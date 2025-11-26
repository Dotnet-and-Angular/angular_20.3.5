import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { createUser, } from '../user-state-store/user.actions';
import { CommonModule } from '@angular/common';
import { User } from '../user-state-store/user.interface';
import { USER_MESSAGES } from '../../../constants/user-messages';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {
  private http = inject(HttpClient);
  private router = inject(Router);
  private store = inject(Store<any>);

  labels = USER_MESSAGES.REGISTER;

  alreadyExists = signal(false);

  form = signal(new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  }));

  onSubmit() {
    if (!this.form().valid) return;
    const v = this.form().value as { username: string; password: string; confirmPassword: string };
    if (v.password !== v.confirmPassword) {
      // simple client-side check
      this.form().get('confirmPassword')?.setErrors({ mismatch: true });
      return;
    }
    const payload = { username: v.username, password: v.password, role: 'user' as const };
    this.store.dispatch(createUser(payload));
    this.router.navigate(['/login'])
  }
}
