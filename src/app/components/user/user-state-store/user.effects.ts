import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, } from "rxjs";
import { loadPersons, loadPersonsFailure, loadPersonsSuccess, loadUser, loadUserFailure, loadUserSuccess, setToken } from "./user.actions";
import { UserLogin } from "../../../services/user-login";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { Person } from "../../../services/person/person";


export class UserEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserLogin);
    private store = inject(Store);
    private router = inject(Router);
    private personService = inject(Person);

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUser),
            mergeMap((payload) =>
                this.userService.login({ username: payload.username, password: payload.password }).pipe(
                    map((res: any) => {
                        this.store.dispatch(setToken({ token: res?.token }));
                        if (res?.token) {
                            this.router.navigate(['/user']);
                        }
                        return loadUserSuccess({ action: res });
                    }),
                    catchError(error => of(loadUserFailure({ error })))
                )
            )
        )
    );

    loadPersons$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPersons),
            mergeMap(() =>
                this.personService.getAll().pipe(
                    map((persons) => loadPersonsSuccess({ persons })),
                    catchError(error => of(loadPersonsFailure({ error: error.message })))
                )
            )
        )
    );
}
