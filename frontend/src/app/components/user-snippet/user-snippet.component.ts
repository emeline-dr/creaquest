import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-snippet',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './user-snippet.component.html',
  styleUrl: './user-snippet.component.css'
})
export class UserSnippetComponent {
  userProfile: any;

  pageCo = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private route: Router
  ) { }

  ngOnInit(): void {

    this.route.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;
        if (
          currentUrl === '/home' ||
          currentUrl === '/login' ||
          currentUrl === '/register' ||
          currentUrl === '/login?registration=success'
        ) {
          this.pageCo = true;
        }
      });
    this.dataService.getUser().subscribe({
      next: (profile) => this.userProfile = profile,
      error: (err) => console.error('Erreur lors de la récupération du profil', err)
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
