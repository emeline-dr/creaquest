import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Howl } from 'howler';
import { RouterModule, ActivatedRoute, Router, NavigationEnd, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { DataService } from '../../services/data.service';

import { NoPageComponent } from '../../pages/no-page/no-page.component';


@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    RouterModule
  ],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.css'
})
export class AudioPlayerComponent {
  pageCo = false;

  sound: Howl | undefined;
  listMusic: any[] = [];
  currentIndex = 0;
  isPlaying = false;
  progress = 0;
  currentTitle = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
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

    this.dataService.getMusic().subscribe({
      next: (musics) => {
        this.listMusic = musics;
        this.loadCurrentTrack();
      },
      error: (err) => console.error('Erreur récupération musique', err)
    });
  }

  getLastChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  loadCurrentTrack() {
    const music = this.listMusic[this.currentIndex];
    const src = `assets/music/${music.m_url}`;
    this.currentTitle = music.m_name;

    if (this.sound) {
      this.sound.unload();
    }

    this.sound = new Howl({
      src: [src],
      html5: true,
      onend: () => this.playNext()
    });
  }

  play() {
    this.sound?.play();
    this.isPlaying = true;
    this.trackProgress();
  }

  pause() {
    this.sound?.pause();
    this.isPlaying = false;
  }

  togglePlay() {
    this.isPlaying ? this.pause() : this.play();
  }

  playNext() {
    this.currentIndex = (this.currentIndex + 1) % this.listMusic.length;
    this.loadCurrentTrack();
  }

  playPrevious() {
    this.currentIndex =
      (this.currentIndex - 1 + this.listMusic.length) % this.listMusic.length;
    this.loadCurrentTrack();
  }

  trackProgress() {
    if (!this.sound) return;
    const interval = setInterval(() => {
      if (this.sound?.playing()) {
        this.progress = (this.sound.seek() as number / this.sound.duration()) * 100;
      } else {
        clearInterval(interval);
      }
    }, 500);
  }

  seekAudio(event: any) {
    const value = event.target.value;
    if (this.sound) {
      const seekTo = (value / 100) * this.sound.duration();
      this.sound.seek(seekTo);
      this.progress = value;
    }
  }
}
