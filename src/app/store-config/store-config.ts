import { isDevMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { authTokenReducer, personReducers, storeReducer } from "../components/user/user-state-store/user.reducer";
import { UserEffects } from '../components/user/user-state-store/user.effects';

export const storeConfig = {
    reducers: {
        users: storeReducer,
        accessToken: authTokenReducer,
        persons: personReducers
    },
    effects: [UserEffects]
};

export const ProvideAppStore = () => [
    provideStore(storeConfig.reducers),
    provideEffects(storeConfig.effects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
];