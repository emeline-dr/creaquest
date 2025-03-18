import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { TitleCreaquestComponent } from '../../components/title-creaquest/title-creaquest.component';
import { CopyrightComponent } from '../../components/copyright/copyright.component';

@Component({
  selector: 'app-no-page',
  standalone: true,
  imports: [
    RouterModule,
    TitleCreaquestComponent,
    CopyrightComponent
  ],
  templateUrl: './no-page.component.html',
  styleUrl: './no-page.component.css'
})

export class NoPageComponent {
  routeUrl = '/index';
  token: string | null = localStorage.getItem('token');

  constructor(
    private titleService: Title,
  ) {
    if (!this.token) {
      this.routeUrl = '/home';
    }
    this.titleService.setTitle("Créaquest - 404")
  }
}
