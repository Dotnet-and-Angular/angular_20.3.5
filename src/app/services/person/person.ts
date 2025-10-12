import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPerson } from "../../components/user/dashboard/interface/person";

@Injectable({ providedIn: 'root' })
export class Person {
  private base = 'http://localhost:5297/api/person';
  private http = inject(HttpClient);

  all(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(`${this.base}/all`);
  }

  create(person: Partial<IPerson>): Observable<IPerson> {
    return this.http.post<IPerson>(`${this.base}/create`, person);
  }
}
