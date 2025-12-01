import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SETTINGS_MESSAGES } from '@constants';

interface ApiKey {
  id: number;
  name: string;
  created: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './account-settings.html',
  styleUrl: './account-settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSettingsComponent {
  labels = SETTINGS_MESSAGES.ACCOUNT;

  showPasswordForm = false;
  tfaEnabled = false;
  successMessage = '';

  passwordData: PasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  apiKeys: ApiKey[] = [
    { id: 1, name: 'Production API Key', created: '2024-01-15' },
    { id: 2, name: 'Development API Key', created: '2024-01-10' }
  ];

  onChangePassword() {
    this.showPasswordForm = !this.showPasswordForm;
  }

  onSavePassword() {
    if (this.passwordData.newPassword === this.passwordData.confirmPassword) {
      this.successMessage = 'Password changed successfully!';
      this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
      this.showPasswordForm = false;
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    } else {
      this.successMessage = 'Passwords do not match!';
    }
  }

  onToggleTFA() {
    this.tfaEnabled = !this.tfaEnabled;
    this.successMessage = `2FA has been ${this.tfaEnabled ? 'enabled' : 'disabled'}`;
    setTimeout(() => {
      this.successMessage = '';
    }, 2000);
  }

  onGenerateKey() {
    const newKey: ApiKey = {
      id: this.apiKeys.length + 1,
      name: `API Key ${this.apiKeys.length + 1}`,
      created: new Date().toISOString().split('T')[0]
    };
    this.apiKeys.push(newKey);
    this.successMessage = 'New API key generated successfully!';
    setTimeout(() => {
      this.successMessage = '';
    }, 2000);
  }

  onRevokeKey(id: number) {
    this.apiKeys = this.apiKeys.filter(key => key.id !== id);
    this.successMessage = 'API key revoked successfully!';
    setTimeout(() => {
      this.successMessage = '';
    }, 2000);
  }

  onDeleteAccount() {
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      this.successMessage = 'Account deletion process initiated';
      setTimeout(() => {
        this.successMessage = '';
      }, 2000);
    }
  }
}
