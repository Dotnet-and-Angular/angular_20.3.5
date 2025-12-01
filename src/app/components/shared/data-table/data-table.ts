import { Component, input, output, signal, computed, ChangeDetectionStrategy } from '@angular/core';

import { GLOBAL_MESSAGES } from '@constants';

export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
    format?: (value: any) => string;
}

export type SortDirection = 'asc' | 'desc' | null;

@Component({
    selector: 'app-data-table',
    standalone: true,
    imports: [],
    templateUrl: './data-table.html',
    styleUrl: './data-table.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
    labels = GLOBAL_MESSAGES.COMMON;

    data = input<any[]>([]);
    columns = input<TableColumn[]>([]);
    striped = input<boolean>(true);
    hoverable = input<boolean>(true);
    bordered = input<boolean>(true);

    sortColumn = signal<string | null>(null);
    sortDirection = signal<SortDirection>(null);
    searchTerm = signal<string>('');

    rowSelected = output<any>();
    rowDoubleClicked = output<any>();

    filteredAndSortedData = computed(() => {
        let result = [...this.data()];

        // Filter by search term
        if (this.searchTerm()) {
            const term = this.searchTerm().toLowerCase();
            result = result.filter(row =>
                this.columns().some(col =>
                    String(row[col.key]).toLowerCase().includes(term)
                )
            );
        }

        // Sort
        if (this.sortColumn() && this.sortDirection()) {
            const col = this.sortColumn()!;
            const dir = this.sortDirection()!;
            result.sort((a, b) => {
                const aVal = a[col];
                const bVal = b[col];
                const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
                return dir === 'asc' ? comparison : -comparison;
            });
        }

        return result;
    });

    toggleSort(column: TableColumn): void {
        if (!column.sortable) return;

        if (this.sortColumn() === column.key) {
            // Cycle: asc -> desc -> null
            const current = this.sortDirection();
            if (current === 'asc') {
                this.sortDirection.set('desc');
            } else if (current === 'desc') {
                this.sortDirection.set(null);
                this.sortColumn.set(null);
            }
        } else {
            this.sortColumn.set(column.key);
            this.sortDirection.set('asc');
        }
    }

    onSearch(term: string): void {
        this.searchTerm.set(term);
    }

    getCellValue(row: any, column: TableColumn): string {
        const value = row[column.key];
        return column.format ? column.format(value) : (value ?? '-');
    }

    getSortIcon(column: TableColumn): string {
        if (this.sortColumn() !== column.key) return '⇅';
        return this.sortDirection() === 'asc' ? '↑' : '↓';
    }

    onRowClick(row: any): void {
        this.rowSelected.emit(row);
    }

    onRowDoubleClick(row: any): void {
        this.rowDoubleClicked.emit(row);
    }

    trackByIndex(index: number): number {
        return index;
    }
}
