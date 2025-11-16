import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsComponent } from './analytics';

describe('AnalyticsComponent', () => {
    let component: AnalyticsComponent;
    let fixture: ComponentFixture<AnalyticsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AnalyticsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AnalyticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display analytics title', () => {
        const title = fixture.nativeElement.querySelector('h1');
        expect(title.textContent).toContain('Analytics');
    });

    it('should render stat cards', () => {
        const statCards = fixture.nativeElement.querySelectorAll('.stat-card');
        expect(statCards.length).toBe(4);
    });

    it('should display correct stat labels', () => {
        const labels = fixture.nativeElement.querySelectorAll('.stat-label');
        expect(labels[0].textContent).toContain('Total Visits');
        expect(labels[1].textContent).toContain('Active Users');
        expect(labels[2].textContent).toContain('Revenue');
        expect(labels[3].textContent).toContain('Avg. Session');
    });

    it('should display correct stat values', () => {
        const values = fixture.nativeElement.querySelectorAll('.stat-value');
        expect(values[0].textContent).toContain('12,543');
        expect(values[1].textContent).toContain('3,421');
        expect(values[2].textContent).toContain('$45,678');
        expect(values[3].textContent).toContain('4m 32s');
    });

    it('should display performance overview section', () => {
        const chartsSection = fixture.nativeElement.querySelector('.charts-section h2');
        expect(chartsSection.textContent).toContain('Performance Overview');
    });

    it('should display chart placeholder', () => {
        const placeholder = fixture.nativeElement.querySelector('.chart-placeholder');
        expect(placeholder).toBeTruthy();
        expect(placeholder.textContent).toContain('Charts will be rendered here');
    });
});
