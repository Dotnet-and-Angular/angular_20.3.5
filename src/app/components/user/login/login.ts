import { HttpClient } from '@angular/common/http';
import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserLogin } from '@services';
import { Store } from '@ngrx/store';
import { loadUser, setToken, setUser } from '@store/user';
import { CommonModule } from '@angular/common';
import { USER_MESSAGES } from '@constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  private userLogin = inject(UserLogin);
  private router = inject(Router);
  private store = inject(Store);

  labels = USER_MESSAGES.LOGIN;

  phoneMode = signal(false);
  otpSent = signal(false);
  showSessionAlert = signal(true);

  // Error handling
  loginError = signal('');
  otpSendError = signal('');
  otpVerifyError = signal('');

  // Loading states
  isLoginLoading = signal(false);
  isOtpSending = signal(false);
  isOtpVerifying = signal(false);

  // signal-wrapped reactive form with usernameOrEmail + password + role
  form = signal(new FormGroup({
    usernameOrEmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('user', [Validators.required])
  }));

  // phone sign-in form with usernameOrEmail instead of phone
  phoneForm = signal(new FormGroup({
    usernameOrEmail: new FormControl('', [Validators.required, Validators.email])
  }));

  // otp verification form with role
  otpForm = signal(new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('user', [Validators.required])
  }));

  setPhoneMode(enabled: boolean) {
    this.phoneMode.set(enabled);
    // reset state when toggling
    this.otpSent.set(false);
    this.otpForm.set(new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('user', [Validators.required])
    }));
  }

  onGoToSurvey() {
    // Open survey in new window
    window.open('https://example.com/survey', '_blank');
  }

  onSubmit() {
    if (this.form().valid) {
      this.loginError.set('');
      this.isLoginLoading.set(true);

      const usernameOrEmail = this.form().value.usernameOrEmail ?? '';
      const password = this.form().value.password ?? '';
      const role = this.form().value.role ?? 'user';

      this.userLogin.login({ usernameOrEmail, password, role }).subscribe({
        next: (response: any) => {
          this.isLoginLoading.set(false);
          const token = response?.token;
          const responseRole = response?.role || role;
          const profileData = response?.profile || {};

          // Build profile object
          const profile = {
            firstName: profileData?.firstName || 'User',
            lastName: profileData?.lastName || '',
            bio: profileData?.bio || '',
            email: profileData?.email || usernameOrEmail,
            phone: profileData?.phone || '',
            location: profileData?.location || '',
            department: profileData?.department || '',
            role: responseRole,
            memberSince: profileData?.memberSince || new Date().toLocaleDateString(),
            status: profileData?.status || 'Active',
            lastLogin: profileData?.lastLogin || new Date().toLocaleString(),
            verified: profileData?.verified || false,
          };

          this.store.dispatch(setToken({ token, role: responseRole }));
          this.store.dispatch(setUser({
            username: usernameOrEmail,
            role: responseRole as any,
            profile
          }));

          if (response.role === 'user' && response.token) {
            this.router.navigate(['/user']);
          } else if (response.role === 'admin' && response.token) {
            this.router.navigate(['/admin']);
          }
        },
        error: (error) => {
          this.isLoginLoading.set(false);
          const errorMsg = error?.error?.message || error?.message || 'Login failed. Please check your credentials.';
          this.loginError.set(errorMsg);
        }
      });
    }
  }

  sendOtp() {
    if (this.phoneForm().valid) {
      this.otpSendError.set('');
      this.isOtpSending.set(true);

      const usernameOrEmail = this.phoneForm().value.usernameOrEmail ?? '';
      this.userLogin.sendOtp(usernameOrEmail).subscribe({
        next: (response: any) => {
          this.isOtpSending.set(false);
          this.otpSent.set(true);
        },
        error: (error) => {
          this.isOtpSending.set(false);
          const errorMsg = error?.error?.message || error?.message || 'Failed to send OTP. Please try again.';
          this.otpSendError.set(errorMsg);
        }
      });
    }
  }

  verifyOtp() {
    if (this.otpForm().valid) {
      this.otpVerifyError.set('');
      this.isOtpVerifying.set(true);

      const usernameOrEmail = this.phoneForm().get('usernameOrEmail')?.value ?? '';
      const code = this.otpForm().get('otp')?.value ?? '';
      const role = this.otpForm().get('role')?.value ?? 'user';

      this.userLogin.verifyOtp(usernameOrEmail, code, role).subscribe({
        next: (response: any) => {
          this.isOtpVerifying.set(false);
          const token = response?.token;
          const responseRole = response?.role || role;
          const profileData = response?.profile || {};

          // Build profile object from API response
          const profile = {
            firstName: profileData?.firstName || 'User',
            lastName: profileData?.lastName || '',
            bio: profileData?.bio || '',
            email: profileData?.email || usernameOrEmail,
            phone: profileData?.phone || '',
            location: profileData?.location || '',
            department: profileData?.department || '',
            role: responseRole,
            memberSince: profileData?.memberSince || new Date().toLocaleDateString(),
            status: profileData?.status || 'Active',
            lastLogin: profileData?.lastLogin || new Date().toLocaleString(),
            verified: profileData?.verified || false,
          };

          // Dispatch token with role
          this.store.dispatch(setToken({ token, role: responseRole }));

          // Dispatch user state with profile data
          this.store.dispatch(setUser({
            username: usernameOrEmail,
            role: responseRole as any,
            profile
          }));

          if (response.token) {
            this.router.navigate(['/user']);
          }
        },
        error: (error) => {
          this.isOtpVerifying.set(false);
          const errorMsg = error?.error?.message || error?.message || 'OTP verification failed. Please try again.';
          this.otpVerifyError.set(errorMsg);
        }
      });
    }
  }
}

