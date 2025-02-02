import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true, // ✅ This makes it standalone
  imports: [CommonModule, RouterModule], // ✅ Import necessary modules
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css',]
})
export class AppLayoutComponent {
  token: any;
  uniqueItemsCount: number = 0;
  drawerOpened: any;
  isScrolled =  false;

  @Input() takeSpace = true;

  toggleDrawer() {

  }

  handleLogout() {

  }
}
