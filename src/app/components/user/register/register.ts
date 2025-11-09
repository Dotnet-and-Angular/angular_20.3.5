import { Component, signal, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { newUser } from '../user-state-store/user.interface';
import { select, Store } from '@ngrx/store';
import { setUser } from '../user-state-store/user.actions';
import { selectUser } from '../user-state-store/user.selector';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [ReactiveFormsModule, RouterModule]
})
export class Register {
  private http = inject(HttpClient);
  private router = inject(Router);
  private store = inject(Store<newUser>);

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
    const payload = { username: v.username, password: v.password, confirmPassword: v.confirmPassword };

    this.store.dispatch(setUser(payload));
    this.store.pipe(select(selectUser)).pipe(take(1)).subscribe(userState => {
      console.log('Registration successful', userState);
      this.router.navigate(['/login']);
    });
  }
}
