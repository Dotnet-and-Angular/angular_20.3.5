import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { createUser, } from '@store/user';
import { USER_MESSAGES } from '@constants';

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
  roles = ['admin', 'user', 'editor', 'viewer'];

  alreadyExists = signal(false);

  form = signal(new FormGroup({
    usernameOrEmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    role: new FormControl('user', [Validators.required])
  }));

  onSubmit() {
    if (!this.form().valid) return;
    const v = this.form().value as { usernameOrEmail: string; password: string; confirmPassword: string; role: string };

    if (v.password !== v.confirmPassword) {
      this.form().get('confirmPassword')?.setErrors({ mismatch: true });
      return;
    }

    const payload = {
      usernameOrEmail: v.usernameOrEmail,
      password: v.password,
      role: v.role as 'admin' | 'user' | 'editor' | 'viewer'
    };
    this.store.dispatch(createUser(payload));
    this.router.navigate(['/login'])
  }
}
