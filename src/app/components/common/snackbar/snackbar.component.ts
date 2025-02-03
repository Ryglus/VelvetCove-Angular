import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from "../../../services/snackbar.service";

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
  snackbarService = inject(SnackbarService); // ✅ Inject the Snackbar Service

  get message() {
    return this.snackbarService.message();
  }

  get isVisible() {
    return this.snackbarService.isVisible();
  }
}
