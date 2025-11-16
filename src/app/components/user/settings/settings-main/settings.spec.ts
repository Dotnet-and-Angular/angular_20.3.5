import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings';
import { RouterTestingModule } from '@angular/router/testing';

describe('SettingsComponent', () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SettingsComponent, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display settings tabs', () => {
        const compiled = fixture.nativeElement;
        const tabs = compiled.querySelectorAll('.tab');
        expect(tabs.length).toBe(3);
    });

    it('should have Account tab', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('Account');
    });

    it('should have Privacy tab', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('Privacy');
    });

    it('should have Notifications tab', () => {
        const compiled = fixture.nativeElement;
        const text = compiled.textContent;
        expect(text).toContain('Notifications');
    });

    it('should render router-outlet for child routes', () => {
        const compiled = fixture.nativeElement;
        const outlet = compiled.querySelector('router-outlet');
        expect(outlet).toBeTruthy();
    });

    it('should have proper tab styling classes', () => {
        const compiled = fixture.nativeElement;
        const tabs = compiled.querySelectorAll('.tab');
        tabs.forEach((tab: HTMLElement) => {
            expect(tab.classList.contains('tab')).toBe(true);
        });
    });
});
