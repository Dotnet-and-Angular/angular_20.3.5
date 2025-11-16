import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountSettingsComponent } from './account-settings';
import { FormsModule } from '@angular/forms';

describe('AccountSettingsComponent', () => {
    let component: AccountSettingsComponent;
    let fixture: ComponentFixture<AccountSettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AccountSettingsComponent, FormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(AccountSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with password form hidden', () => {
        expect(component.showPasswordForm).toBeFalsy();
    });

    it('should initialize with 2FA disabled', () => {
        expect(component.tfaEnabled).toBeFalsy();
    });

    it('should have API keys', () => {
        expect(component.apiKeys.length).toBeGreaterThan(0);
    });

    it('should toggle password form visibility', () => {
        const initialState = component.showPasswordForm;
        component.onChangePassword();
        expect(component.showPasswordForm).toBe(!initialState);
    });

    it('should save password and display message', () => {
        component.onSavePassword();
        expect(component.successMessage).toBeDefined();
    });

    it('should toggle TFA status', () => {
        const initialState = component.tfaEnabled;
        component.onToggleTFA();
        expect(component.tfaEnabled).toBe(!initialState);
    });

    it('should generate new API key', () => {
        const initialLength = component.apiKeys.length;
        component.onGenerateKey();
        expect(component.apiKeys.length).toBe(initialLength + 1);
    });

    it('should revoke API key', () => {
        const initialLength = component.apiKeys.length;
        const keyIdToRevoke = component.apiKeys[0].id;
        component.onRevokeKey(keyIdToRevoke);
        expect(component.apiKeys.length).toBe(initialLength - 1);
    });

    it('should render settings cards', () => {
        const compiled = fixture.nativeElement;
        const cards = compiled.querySelectorAll('.settings-card');
        expect(cards.length).toBeGreaterThan(0);
    });

    it('should display Password & Security section', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('Password & Security');
    });

    it('should display API Keys section', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('API Keys');
    });

    it('should display 2FA section', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('Two-Factor Authentication');
    });

    it('should have Delete Account button', () => {
        const compiled = fixture.nativeElement;
        const deleteButton = compiled.querySelector('.btn-danger');
        expect(deleteButton).toBeTruthy();
    });
});
