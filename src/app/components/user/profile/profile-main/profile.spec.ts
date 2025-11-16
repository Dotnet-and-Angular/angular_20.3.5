import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render profile tabs', () => {
        const tabs = fixture.nativeElement.querySelectorAll('.tab');
        expect(tabs.length).toBe(2);
    });

    it('should display tab labels', () => {
        const tabs = fixture.nativeElement.querySelectorAll('.tab');
        expect(tabs[0].textContent).toContain('View Profile');
        expect(tabs[1].textContent).toContain('Edit Profile');
    });

    it('should have routerLink directives', () => {
        const tabs = fixture.nativeElement.querySelectorAll('.tab');
        expect(tabs[0].getAttribute('routerLink')).toBe('/user/profile/view');
        expect(tabs[1].getAttribute('routerLink')).toBe('/user/profile/edit');
    });

    it('should render router-outlet', () => {
        const outlet = fixture.nativeElement.querySelector('router-outlet');
        expect(outlet).toBeTruthy();
    });

    it('should have correct icon content', () => {
        const icons = fixture.nativeElement.querySelectorAll('.icon');
        expect(icons[0].textContent).toContain('👁️');
        expect(icons[1].textContent).toContain('✏️');
    });
});
