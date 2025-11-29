import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Person {
  private base = 'http://localhost:5297/api/user';
  private http = inject(HttpClient);

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/list-all-users`);
  }

  create(person: Partial<any>): Observable<any> {
    return this.http.post<any>(`${this.base}/add-user`, person);
  }
}
