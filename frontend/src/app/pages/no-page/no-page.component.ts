import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleCreaquestComponent } from '../../components/title-creaquest/title-creaquest.component';

@Component({
  selector: 'app-no-page',
  standalone: true,
  imports: [
    TitleCreaquestComponent,
    RouterModule
  ],
  templateUrl: './no-page.component.html',
  styleUrl: './no-page.component.css'
})

export class NoPageComponent {
  routeUrl = '/index';
  token: string | null = localStorage.getItem('token');

  constructor() {
    if (!this.token) {
      this.routeUrl = '/home';
    }
  }
}
