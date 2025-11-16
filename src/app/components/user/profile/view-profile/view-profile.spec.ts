import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewProfileComponent } from './view-profile';

describe('ViewProfileComponent', () => {
    let component: ViewProfileComponent;
    let fixture: ComponentFixture<ViewProfileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ViewProfileComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ViewProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display user data correctly', () => {
        expect(component.userData.firstName).toBe('John');
        expect(component.userData.lastName).toBe('Doe');
        expect(component.userData.email).toBe('john.doe@example.com');
    });

    it('should display profile header with avatar and info', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.profile-header')).toBeTruthy();
        expect(compiled.querySelector('.avatar-large')).toBeTruthy();
        expect(compiled.querySelector('.header-info h2')).toBeTruthy();
    });

    it('should display all profile sections', () => {
        const compiled = fixture.nativeElement;
        const sections = compiled.querySelectorAll('.section');
        expect(sections.length).toBeGreaterThan(0);
    });

    it('should display contact information section', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('Contact Information');
        expect(text).toContain('Email:');
    });

    it('should display professional information section', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('Professional Information');
        expect(text).toContain('Department:');
    });

    it('should display account status section', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('Account Status');
        expect(text).toContain('Status:');
    });

    it('should mark account as verified', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('✓ Yes');
    });

    it('should apply status styling to active status', () => {
        const compiled = fixture.nativeElement;
        const activeStatus = compiled.querySelector('.status-active');
        expect(activeStatus).toBeTruthy();
        expect(activeStatus.textContent).toContain('Active');
    });
});
