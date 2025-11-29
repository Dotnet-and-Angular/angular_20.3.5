import { isDevMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { authTokenReducer, userReducer, UserEffects } from "@store/user";
import { adminReducer, AdminEffects } from '@store/admin';

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