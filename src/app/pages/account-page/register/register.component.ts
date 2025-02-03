import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SvgPageBgComponent } from "../../../components/common/svg-page-bg/svg-page-bg.component";
import { AppLayoutComponent } from "../../../layouts/app-layout/app-layout.component";
import { AuthService } from "../../../services/auth.service";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SvgPageBgComponent, AppLayoutComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // ✅ Loading & Error signals for UI feedback
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  // ✅ Handle form submission
  handleRegister() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      /*
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/account/login']);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(error.message || 'Registration failed.');
        },
      });

       */
    }
  }
}
