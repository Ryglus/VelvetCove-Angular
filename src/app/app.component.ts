import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppLayoutComponent} from "./layouts/app-layout/app-layout.component";
import { SnackbarComponent } from "./components/common/snackbar/snackbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppLayoutComponent, SnackbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VelvetCove-Angular';
}
