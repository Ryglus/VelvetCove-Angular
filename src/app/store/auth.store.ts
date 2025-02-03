import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly TOKEN_KEY = 'auth_token';
  private platformId = inject(PLATFORM_ID);

  private isBrowser = isPlatformBrowser(this.platformId);

  private token = signal<string | null>(this.isBrowser ? localStorage.getItem(this.TOKEN_KEY) : null);

  getToken(): string | null {
    return this.token();
  }

  setToken(token: string): void {
    this.token.set(token);
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  clearToken(): void {
    this.token.set(null);
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }
}
