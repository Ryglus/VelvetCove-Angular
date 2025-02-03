import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthStore } from "../store/auth.store";
import { Router } from '@angular/router';

const API_URL = 'https://fakestoreapi.com';

interface LoginVariables {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  isAuthenticated = computed(() => !!this.authStore.getToken());

  login(credentials: LoginVariables): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_URL}/auth/login`, credentials).pipe(
      tap((response) => {
        this.authStore.setToken(response.token);
        console.log('Login successful, token:', response.token);
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Login failed. Please check your credentials.'));
      })
    );
  }

  logout() {
    this.authStore.clearToken();
    this.router.navigate(['/account/login']);
  }
}
