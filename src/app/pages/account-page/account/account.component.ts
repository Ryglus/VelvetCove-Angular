import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SvgPageBgComponent } from "../../../components/common/svg-page-bg/svg-page-bg.component";
import { AppLayoutComponent } from "../../../layouts/app-layout/app-layout.component";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, SvgPageBgComponent, SvgPageBgComponent, AppLayoutComponent, RouterLink],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  user = signal<any>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.userService.getUserInfo().subscribe({
      next: (userData) => {
        this.user.set(userData);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Error fetching user details.');
        this.isLoading.set(false);
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/account/login']);
  }
}
