import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../core/models/User';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, TitleCasePipe],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile {
  user: User | null = null;

  sections = [
    { key: 'profile', label: 'Profile' },
    { key: 'savedJobs', label: 'Saved Jobs' },
    { key: 'favoriteJobs', label: 'Favorite Jobs' },
    { key: 'settings', label: 'Settings' },
  ];

  activeSection: string = 'profile';

  constructor(private router: Router) {
    this.loadUser();
  }

  loadUser() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  switchSection(sectionKey: string) {
    this.activeSection = sectionKey;
  }
}
