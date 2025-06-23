import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute, Router, NavigationEnd, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LucideAngularModule } from 'lucide-angular';

import { NoPageComponent } from '../../pages/no-page/no-page.component';

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd || event instanceof ActivationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        const hasToken = !!localStorage.getItem('token');

        const lastChild = this.getLastChild(this.activatedRoute);
        const data = lastChild.snapshot.data;

        const is404 = data['is404'] === true;

        // 🔁 Redirection dynamique logo
        if (is404 || currentUrl === '/home' || currentUrl === '/login' || currentUrl === '/register') {
          this.routeUrl = hasToken ? '/index' : '/home';
        } else {
          this.routeUrl = '/index';
        }

        this.pageHome = currentUrl === '/home';

        this.pageCo = data['hideNav'] === true ||
          currentUrl === '/home' ||
          currentUrl === '/login' ||
          currentUrl === '/register' ||
          currentUrl === '/login?registration=success' ||
          currentUrl === '/administration' ||
          currentUrl === '/administration/tasks' ||
          currentUrl === '/administration/users';
      });
  }

  getLastChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
