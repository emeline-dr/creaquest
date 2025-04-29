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

        // Route par défaut
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

        const lastChild = this.getLastChild(this.activatedRoute);
        const component = lastChild.snapshot.routeConfig?.component;

        if (
          component === NoPageComponent ||
          currentUrl === '/home' ||
          currentUrl === '/login' ||
          currentUrl === '/register' ||
          currentUrl === '/login?registration=success'
        ) {
          this.pageCo = true;
        } else {
          this.pageCo = false;
        }
      });
  }

  getLastChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
