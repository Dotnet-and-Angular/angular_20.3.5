import { isDevMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { authTokenReducer, userReducer } from "../components/user/user-state-store/user.reducer";
import { UserEffects } from '../components/user/user-state-store/user.effects';
import { adminReducer } from '../components/admin/admin-store/admin.reducer';
import { AdminEffects } from '../components/admin/admin-store/admin.effects';

export const storeConfig = {
    reducers: {
        user: userReducer,
        accessToken: authTokenReducer,
        admin: adminReducer,
    },
    effects: [UserEffects, AdminEffects]
};

export const ProvideAppStore = () => [
    provideStore(storeConfig.reducers),
    provideEffects(storeConfig.effects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
];