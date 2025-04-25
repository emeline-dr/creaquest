import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-logo-nav',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './logo-nav.component.html',
  styleUrl: './logo-nav.component.css'
})

export class LogoNavComponent {
  routeUrl = '';
  pageHome = false;
  pageCo = false;

  constructor(
    private route: Router
  ) {
  }

  ngOnInit() {
    this.route.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;

        if (
          currentUrl === '/login' ||
          currentUrl === '/register' ||
          currentUrl === '/login?registration=success'
        ) {
          this.routeUrl = '/home';
        } else {
          this.routeUrl = '/index';
        }

        this.pageHome = currentUrl === '/home';

        if (
          currentUrl === '/home' ||
          currentUrl === '/login' ||
          currentUrl === '/register' ||
          currentUrl === '/login?registration=success'
        ) {
          this.pageCo = true;
        }
      });
  }
}
