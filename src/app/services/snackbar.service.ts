import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root', // ✅ Ensure it's available globally
})
export class SnackbarService {
  private _message = signal<string>('');
  private _isVisible = signal<boolean>(false);

  get message() {
    return this._message;
  }

  get isVisible() {
    return this._isVisible;
  }

  showMessage(msg: string) {
    this._message.set(msg);
    this._isVisible.set(true);

    setTimeout(() => {
      this._isVisible.set(false);
    }, 3000); // Hide after 3 seconds
  }
}
