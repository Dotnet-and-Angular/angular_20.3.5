import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { selectUserProfile } from '@store/user';
import { USER_MESSAGES } from '@constants';

@Component({
    selector: 'app-view-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './view-profile.html',
    styleUrl: './view-profile.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewProfileComponent {
    private store = inject(Store);
    userData$ = this.store.pipe(select(selectUserProfile));
    labels = USER_MESSAGES.PROFILE;
}
