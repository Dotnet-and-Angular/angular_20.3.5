import { HttpClient } from '@angular/common/http';
import { Component, signal, output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [ReactiveFormsModule, RouterModule]
})
export class Login {
  private http = inject(HttpClient);
  private router = inject(Router);

  phoneMode = signal(false);
  otpSent = signal(false);

  // signal-wrapped reactive form with username + password
  form = signal(new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  }));

  // phone sign-in form
  phoneForm = signal(new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.minLength(10)])
  }));

  // otp verification form
  otpForm = signal(new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.minLength(6)])
  }));



  setPhoneMode(enabled: boolean) {
    this.phoneMode.set(enabled);
    // reset state when toggling
    this.otpSent.set(false);
    this.otpForm.set(new FormGroup({ otp: new FormControl('', [Validators.required, Validators.minLength(6)]) }));
  }

  onSubmit() {
    if (this.form().valid) {
      console.log(this.form().value);
      this.http.post('http://localhost:5297/api/auth/token', this.form().value).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          const token = window.localStorage.getItem('token');
          if (token) {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    }
  }

  sendOtp() {
    if (this.phoneForm().valid) {
      const data = { phone: this.phoneForm().value.phone, code: '' };
      this.http.post('http://localhost:5297/api/auth/send-otp', data).subscribe({
        next: (response: any) => {
          console.log('OTP Generated successfully', response);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
      // TODO: integrate SMS provider to send OTP
      this.otpSent.set(true);
    }
  }

  verifyOtp() {
    if (this.otpForm().valid) {
      const data = { phone: this.phoneForm().value.phone, code: this.otpForm().value.otp };
      this.http.post('http://localhost:5297/api/auth/verify-otp', data).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          const token = window.localStorage.getItem('token');
          if (token) {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    }
  }
}

