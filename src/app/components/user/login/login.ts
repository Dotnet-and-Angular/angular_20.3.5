import { HttpClient } from '@angular/common/http';
import { Component, signal, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserLogin } from '../../../services/user-login';
import { Store } from '@ngrx/store';
import { loadUser, setToken } from '../user-state-store/user.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [ReactiveFormsModule, RouterModule]
})
export class Login {
  private http = inject(HttpClient);
  private userLogin = inject(UserLogin);
  private router = inject(Router);
  private store = inject(Store);


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

      this.store.dispatch(loadUser({
        username: this.form().value.username ?? '',
        password: this.form().value.password ?? ''
      }));
      // this.userLogin.login(this.form().value as any).subscribe({
      //   next: (response: any) => {
      //     
      //   },
      //   error: (error) => {
      //     console.error('Login failed', error);
      //   }
      // });
    }
  }

  sendOtp() {
    if (this.phoneForm().valid) {
      const phone = this.phoneForm().value.phone ?? '';
      this.userLogin.sendOtp(phone).subscribe({
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
      const phone = this.phoneForm().value.phone ?? '';
      const otp = this.otpForm().value.otp ?? '';

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

