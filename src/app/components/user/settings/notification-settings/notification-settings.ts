import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SETTINGS_MESSAGES } from '@constants';

interface EmailNotifications {
  newMessages: boolean;
  accountUpdates: boolean;
  systemAlerts: boolean;
  weeklyDigest: boolean;
}

interface PushNotifications {
  browser: boolean;
  desktop: boolean;
  sound: boolean;
  vibration: boolean;
}

interface QuietHours {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface Device {
  id: string;
  name: string;
  icon: string;
  lastActive: string;
  notificationsEnabled: boolean;
}

@Component({
  selector: 'app-notification-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification-settings.html',
  styleUrl: './notification-settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationSettingsComponent {
  labels = SETTINGS_MESSAGES.NOTIFICATION;

  emailNotifications: EmailNotifications = {
    newMessages: true,
    accountUpdates: true,
    systemAlerts: true,
    weeklyDigest: false
  };

  pushNotifications: PushNotifications = {
    browser: true,
    desktop: false,
    sound: true,
    vibration: true
  };

  quietHours: QuietHours = {
    enabled: false,
    startTime: '22:00',
    endTime: '08:00'
  };

  devices: Device[] = [
    {
      id: 'desktop',
      name: 'Desktop Chrome',
      icon: '🖥️',
      lastActive: 'Active now',
      notificationsEnabled: true
    },
    {
      id: 'mobile',
      name: 'Mobile Safari',
      icon: '📱',
      lastActive: '2 hours ago',
      notificationsEnabled: true
    },
    {
      id: 'tablet',
      name: 'Tablet Chrome',
      icon: '📱',
      lastActive: '1 day ago',
      notificationsEnabled: false
    }
  ];

  onQuietHoursChange() {
    if (this.quietHours.enabled) {
      alert('Quiet hours enabled. You won\'t receive notifications during these times.');
    }
  }

  onSaveSettings() {
    alert('All notification settings saved successfully!');
  }

  onResetDefaults() {
    if (confirm('Are you sure you want to reset to default settings?')) {
      this.emailNotifications = {
        newMessages: true,
        accountUpdates: true,
        systemAlerts: true,
        weeklyDigest: false
      };
      this.pushNotifications = {
        browser: true,
        desktop: false,
        sound: true,
        vibration: true
      };
      alert('Settings reset to defaults');
    }
  }
}
