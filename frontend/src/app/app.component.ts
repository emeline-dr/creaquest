import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LogoNavComponent } from './components/logo-nav/logo-nav.component';
import { UserSnippetComponent } from './components/user-snippet/user-snippet.component';
import { CopyrightComponent } from './components/copyright/copyright.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LogoNavComponent,
    UserSnippetComponent,
    CopyrightComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'creaquest-frontend';

  data: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
