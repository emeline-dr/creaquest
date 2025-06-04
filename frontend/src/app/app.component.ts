import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LogoNavComponent } from './components/logo-nav/logo-nav.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LogoNavComponent,
    AudioPlayerComponent
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
