import { Component, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router, NavigationEnd, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth/auth.service';

import { NoPageComponent } from '../../pages/no-page/no-page.component';

declare const Preline: any; // Déclare Preline globalement

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
export class UserSnippetComponent implements AfterViewChecked {
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

  private dropdownInitialized = false; // Ajoute un indicateur pour s'assurer que le dropdown n'est initialisé qu'une seule fois

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef // Injection du ChangeDetectorRef pour forcer la détection des changements
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

  ngAfterViewChecked(): void {
    // S'assurer que Preline est initialisé une seule fois
    if (!this.dropdownInitialized && window.Preline && window.Preline.Dropdown) {
      window.Preline.Dropdown.init(); // Initialisation du dropdown Preline
      this.dropdownInitialized = true; // Marquer comme initialisé
    }

    // Cette ligne permet de forcer la détection des changements après chaque vérification
    this.cdr.detectChanges();
  }
}
