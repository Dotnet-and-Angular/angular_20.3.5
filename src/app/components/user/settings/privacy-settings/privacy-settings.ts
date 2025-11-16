import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PrivacySettings {
  profilePublic: boolean;
  showEmail: boolean;
  showOnlineStatus: boolean;
  activityLog: boolean;
  allowAnalytics: boolean;
  thirdPartyAccess: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
}

@Component({
  selector: 'app-privacy-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './privacy-settings.html',
  styleUrl: './privacy-settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacySettingsComponent {
  settings: PrivacySettings = {
    profilePublic: true,
    showEmail: false,
    showOnlineStatus: true,
    activityLog: true,
    allowAnalytics: true,
    thirdPartyAccess: false,
    marketingEmails: false,
    securityAlerts: true
  };

  savedMessage = '';

  onSettingChange(setting: string) {
    this.savedMessage = `${setting} setting updated!`;
    setTimeout(() => {
      this.savedMessage = '';
    }, 2000);
  }

  onDownloadData() {
    alert('Your data download has been initiated. Check your email for the download link.');
  }

  onDeleteData() {
    if (confirm('Are you sure? This will permanently delete all your personal data.')) {
      alert('Your data has been scheduled for deletion.');
    }
  }

  onClearCache() {
    alert('Cache cleared successfully!');
  }
}
