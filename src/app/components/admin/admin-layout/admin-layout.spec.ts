import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLayout } from './admin-layout';

describe('AdminLayout', () => {
    let component: AdminLayout;
    let fixture: ComponentFixture<AdminLayout>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminLayout],
        }).compileComponents();

        fixture = TestBed.createComponent(AdminLayout);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle sidenav state', () => {
        expect(component.sideNavOpen()).toBe(true);
        component.toggleSideNav();
        expect(component.sideNavOpen()).toBe(false);
        component.toggleSideNav();
        expect(component.sideNavOpen()).toBe(true);
    });
});
