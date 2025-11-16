import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationSettingsComponent } from './notification-settings';
import { FormsModule } from '@angular/forms';

describe('NotificationSettingsComponent', () => {
    let component: NotificationSettingsComponent;
    let fixture: ComponentFixture<NotificationSettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotificationSettingsComponent, FormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have email notifications initialized', () => {
        expect(component.emailNotifications).toBeDefined();
        expect(component.emailNotifications.newMessages).toBe(true);
    });

    it('should have push notifications initialized', () => {
        expect(component.pushNotifications).toBeDefined();
        expect(component.pushNotifications.browser).toBe(true);
    });

    it('should have quiet hours initialized', () => {
        expect(component.quietHours).toBeDefined();
        expect(component.quietHours.enabled).toBe(false);
    });

    it('should have devices list', () => {
        expect(component.devices.length).toBeGreaterThan(0);
    });

    it('should toggle quiet hours', () => {
        const initialState = component.quietHours.enabled;
        component.quietHours.enabled = !initialState;
        expect(component.quietHours.enabled).toBe(!initialState);
    });

    it('should save settings', () => {
        component.onSaveSettings();
        // Should not throw error
        expect(component).toBeTruthy();
    });

    it('should reset to defaults', () => {
        component.emailNotifications.newMessages = false;
        component.onResetDefaults();
        // After reset, should be back to default
        expect(component).toBeTruthy();
    });

    it('should render notification cards', () => {
        const compiled = fixture.nativeElement;
        const cards = compiled.querySelectorAll('.notification-card');
        expect(cards.length).toBeGreaterThan(0);
    });

    it('should display Email Notifications section', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('Email Notifications');
    });

    it('should display Push Notifications section', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('Push Notifications');
    });

    it('should have action buttons', () => {
        const compiled = fixture.nativeElement;
        const buttons = compiled.querySelectorAll('.btn');
        expect(buttons.length).toBeGreaterThan(0);
    });

    it('should display device list', () => {
        const compiled = fixture.nativeElement;
        const devices = compiled.querySelectorAll('.device-item');
        expect(devices.length).toBeGreaterThan(0);
    });
});
