import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLogin {
  private http = inject(HttpClient);

  login(credentials: { usernameOrEmail: string; password: string; role: string }) {
    // Send login request with usernameOrEmail, password, and role
    return this.http.post('http://localhost:5297/api/auth/login', credentials);
  }


  register(credentials: { usernameOrEmail: string; password: string; role: 'admin' | 'user' | 'editor' | 'viewer' }) {
    // Send registration request with usernameOrEmail, password, and role
    return this.http.post('http://localhost:5297/api/auth/register', credentials);
  }

  sendOtp(usernameOrEmail: string) {
    // Send OTP request with usernameOrEmail
    const data = { usernameOrEmail };
    return this.http.post('http://localhost:5297/api/auth/send-otp', data);
  }

  verifyOtp(usernameOrEmail: string, code: string, role: string) {
    // Verify OTP request with usernameOrEmail, code, and role
    const data = { usernameOrEmail, code, role };
    return this.http.post('http://localhost:5297/api/auth/verify-otp', data);
  }
}
