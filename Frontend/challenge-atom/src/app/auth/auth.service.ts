import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  checkUser(email: string): Observable<{ exists: boolean }> {
    return this.http.post<{ exists: boolean }>(`${this.API_URL}/check`, { email });
  }

  createUser(email: string): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.API_URL}/register`, { email });
  }
}