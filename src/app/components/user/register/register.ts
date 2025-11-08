import { Component, signal, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [ReactiveFormsModule, RouterModule]
})
export class Register {
  private http = inject(HttpClient);
  private router = inject(Router);
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

    const payload = { username: v.username, password: v.password };
    this.http.post('http://localhost:5297/api/admin/register', payload).subscribe({
      next: (res) => {
        console.log('Registration successful', res);
        // navigate to login after successful registration
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.alreadyExists.set(true);
          this.form().get('username')?.setErrors({ conflict: true });
          return;
        }
      },
    });
  }
}
