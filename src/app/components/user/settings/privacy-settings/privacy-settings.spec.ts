import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacySettingsComponent } from './privacy-settings';
import { FormsModule } from '@angular/forms';

describe('PrivacySettingsComponent', () => {
    let component: PrivacySettingsComponent;
    let fixture: ComponentFixture<PrivacySettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PrivacySettingsComponent, FormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(PrivacySettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have privacy settings initialized', () => {
        expect(component.settings).toBeDefined();
        expect(component.settings.profilePublic).toBeDefined();
    });

    it('should display privacy cards', () => {
        const compiled = fixture.nativeElement;
        const cards = compiled.querySelectorAll('.privacy-card');
        expect(cards.length).toBeGreaterThan(0);
    });

    it('should display Profile Visibility section', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('Profile Visibility');
    });

    it('should display Data & Privacy section', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('Data & Privacy');
    });

    it('should toggle profile public setting', () => {
        const initialState = component.settings.profilePublic;
        component.settings.profilePublic = !initialState;
        expect(component.settings.profilePublic).toBe(!initialState);
    });

    it('should handle setting changes', () => {
        component.onSettingChange('profile');
        expect(component.savedMessage).toBeDefined();
    });

    it('should clear saved message after timeout', (done) => {
        component.onSettingChange('profile');
        expect(component.savedMessage).not.toBe('');

        setTimeout(() => {
            expect(component.savedMessage).toBe('');
            done();
        }, 2100);
    });

    it('should have data management buttons', () => {
        const compiled = fixture.nativeElement;
        const buttons = compiled.querySelectorAll('button');
        expect(buttons.length).toBeGreaterThan(0);
    });

    it('should display toggle switches', () => {
        const compiled = fixture.nativeElement;
        const checkboxes = compiled.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes.length).toBeGreaterThan(0);
    });
});
