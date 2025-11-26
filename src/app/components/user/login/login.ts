import { HttpClient } from '@angular/common/http';
import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserLogin } from '../../../services/user-login';
import { Store } from '@ngrx/store';
import { loadUser, setToken } from '../user-state-store/user.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  private http = inject(HttpClient);
  private userLogin = inject(UserLogin);
  private router = inject(Router);
  private store = inject(Store);

  phoneMode = signal(false);
  otpSent = signal(false);
  showSessionAlert = signal(true);
  mockAsAdmin = signal(true); // MOCK: Toggle between admin and user roles

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

  onGoToSurvey() {
    // Open survey in new window
    window.open('https://example.com/survey', '_blank');
  }

  onSubmit() {
    if (this.form().valid) {
      this.store.dispatch(loadUser({
        username: this.form().value.username ?? '',
        password: this.form().value.password ?? '',
        mockAsAdmin: this.mockAsAdmin()
      }));
    }
  }

  sendOtp() {
    if (this.phoneForm().valid) {
      const phone = this.phoneForm().value.phone ?? '';
      this.userLogin.sendOtp(phone).subscribe({
        next: (response: any) => {
          this.otpSent.set(true);
        },
        error: (error) => {
          // Handle error
        }
      });
      // TODO: integrate SMS provider to send OTP
    }
  }

  verifyOtp() {
    if (this.otpForm().valid) {
      const phone = this.phoneForm().get('phone')?.value ?? '';
      const otp = this.otpForm().get('otp')?.value ?? '';

      this.userLogin.verifyOtp(phone, otp).subscribe({
        next: (response: any) => {
          this.store.dispatch(setToken({ token: response.token }));
          if (response.token) {
            this.router.navigate(['/user']);
          }
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    }
  }
}

