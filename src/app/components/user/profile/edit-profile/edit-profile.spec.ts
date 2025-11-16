import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfileComponent } from './edit-profile';
import { FormsModule } from '@angular/forms';

describe('EditProfileComponent', () => {
    let component: EditProfileComponent;
    let fixture: ComponentFixture<EditProfileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditProfileComponent, FormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(EditProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form data with user information', () => {
        expect(component.formData.firstName).toBe('John');
        expect(component.formData.lastName).toBe('Doe');
        expect(component.formData.email).toBe('john.doe@example.com');
    });

    it('should have success message empty on init', () => {
        expect(component.successMessage).toBe('');
    });

    it('should submit form successfully', () => {
        component.onSubmit();
        expect(component.successMessage).toBe('Profile updated successfully!');
    });

    it('should clear success message after timeout', (done) => {
        component.onSubmit();
        expect(component.successMessage).toBe('Profile updated successfully!');

        setTimeout(() => {
            expect(component.successMessage).toBe('');
            done();
        }, 3100);
    });

    it('should render form sections', () => {
        const compiled = fixture.nativeElement;
        const sections = compiled.querySelectorAll('.form-section');
        expect(sections.length).toBeGreaterThan(0);
    });

    it('should display Personal Information form section', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('Personal Information');
    });

    it('should have input fields for profile data', () => {
        const compiled = fixture.nativeElement;
        const inputs = compiled.querySelectorAll('input[type="text"]');
        expect(inputs.length).toBeGreaterThan(0);
    });

    it('should bind form data to inputs', () => {
        const compiled = fixture.nativeElement;
        const firstNameInput = compiled.querySelector('#firstName');
        expect(firstNameInput.value).toBe('John');
    });

    it('should have submit button', () => {
        const compiled = fixture.nativeElement;
        const submitButton = compiled.querySelector('button[type="submit"]');
        expect(submitButton).toBeTruthy();
        expect(submitButton.textContent).toContain('Save Changes');
    });

    it('should have cancel button', () => {
        const compiled = fixture.nativeElement;
        const cancelButton = compiled.querySelector('button[type="button"]');
        expect(cancelButton).toBeTruthy();
        expect(cancelButton.textContent).toContain('Cancel');
    });

    it('should clear message on cancel', () => {
        component.successMessage = 'Test message';
        component.onCancel();
        expect(component.successMessage).toBe('');
    });
});
