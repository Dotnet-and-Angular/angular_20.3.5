import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SVG_ICONS } from '@constants';

@Component({
    selector: 'app-svg-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './svg-icon.html',
    styleUrl: './svg-icon.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent {
    name = input<keyof typeof SVG_ICONS>('SEARCH');
    cssClass = input<string>('');
    width = input<string | undefined>(undefined);
    height = input<string | undefined>(undefined);
    ariaLabel = input<string>('');

    icon = computed(() => SVG_ICONS[this.name()]);
}
