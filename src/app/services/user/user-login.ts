import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLogin {
  private http = inject(HttpClient);

  login(credentials: { username: string; password: string }) {
    // Simulate an HTTP request for user login
    return this.http.post('http://localhost:5297/api/auth/token', credentials);
  }


  register(credentials: { username: string; password: string; confirmPassword?: string; role?: 'user' | 'admin' }) {
    // Simulate an HTTP request for user login
    return this.http.post('http://localhost:5297/api/admin/register', credentials);
  }

  sendOtp(phone: string, otp?: string) {
    // Simulate an HTTP request to send OTP
    const data = { phone: phone, code: '' };
    return this.http.post('http://localhost:5297/api/auth/send-otp', data);
  }

  verifyOtp(phone: string, otp: string) {
    // Simulate an HTTP request to verify OTP
    const data = { phone: phone, code: otp };
    return this.http.post('http://localhost:5297/api/auth/verify-otp', data);
  }
}
