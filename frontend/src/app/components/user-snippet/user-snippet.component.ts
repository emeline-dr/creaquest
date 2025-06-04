import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router, NavigationEnd, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth/auth.service';

import { NoPageComponent } from '../../pages/no-page/no-page.component';

declare const Preline: any; // Déclare Preline ici

@Component({
  selector: 'app-user-snippet',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './user-snippet.component.html',
  styleUrls: ['./user-snippet.component.css']
})
export class UserSnippetComponent implements AfterViewInit {
  isLoading = true;

  userProfile: any;
  pageCo = false;
  isBackgroundCustom = false;

  userMedal = '';
  medalLevels = [
    { max: 5, medal: "Medal-Default" },
    { max: 10, medal: "Medal-Bronze" },
    { max: 15, medal: "Medal-Silver" },
    { max: 20, medal: "Medal-Gold" },
  ];

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd || event instanceof ActivationEnd))
      .subscribe(() => {
        const lastChild = this.getLastChild(this.activatedRoute);
        const component = lastChild.snapshot.routeConfig?.component;

        if (
          component === NoPageComponent ||
          this.router.url === '/home' ||
          this.router.url === '/login' ||
          this.router.url === '/register' ||
          this.router.url === '/login?registration=success'
        ) {
          this.pageCo = true;
        } else {
          this.pageCo = false;
        }
      });

    this.dataService.getUser().subscribe({
      next: (profile) => {
        this.userProfile = profile;

        const userLvl = this.userProfile.u_lvl;
        let medal = 'Medal-Diamond';

        for (const tier of this.medalLevels) {
          if (userLvl < tier.max) {
            medal = tier.medal;
            break;
          }
        }

        this.userMedal = `assets/images/medals/${medal}.png`;

        this.isLoading = false;
      },
      error: (err) => console.error('Erreur lors de la récupération du profil', err)
    });
  }

  getLastChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  logout(): void {
    this.authService.logout();
  }

  ngAfterViewInit(): void {
    // Après que la vue soit initialisée, réinitialiser le dropdown
    this.initDropdown();
  }

  private initDropdown(): void {
    setTimeout(() => {
      if (window.Preline && window.Preline.Dropdown) {
        window.Preline.Dropdown.init(); // Initialiser le dropdown Preline
      } else {
        console.warn('Preline.Dropdown n’est pas disponible');
      }
    }, 0); // Assure que tout le DOM est chargé avant d'initialiser le dropdown
  }
}
