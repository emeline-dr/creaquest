import { Component, AfterViewInit, HostListener } from '@angular/core';
import { gsap } from 'gsap';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';

import { SocialNetworkComponent } from './components/social-network/social-network.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeMobileComponent } from './components/home-mobile/home-mobile.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    LucideAngularModule,
    SocialNetworkComponent,
    NavBarComponent,
    HomeMobileComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  private sections: HTMLElement[] = [];
  private isScrolling = false;
  currentIndex = 0;

  ngAfterViewInit(): void {
    this.sections = Array.from(document.querySelectorAll('section'));
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    if (this.isScrolling) return;
    event.preventDefault();

    this.isScrolling = true;
    const direction = event.deltaY > 0 ? 1 : -1;
    this.currentIndex = Math.min(Math.max(this.currentIndex + direction, 0), this.sections.length - 1);

    gsap.to(document.scrollingElement, {
      scrollTop: this.sections[this.currentIndex].offsetTop,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => { this.isScrolling = false; }
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isScrolling) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();

      this.isScrolling = true;
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      this.currentIndex = Math.min(Math.max(this.currentIndex + direction, 0), this.sections.length - 1);

      gsap.to(document.scrollingElement, {
        scrollTop: this.sections[this.currentIndex].offsetTop,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => { this.isScrolling = false; }
      });
    }
  }

  goToNextSection(): void {
    if (this.isScrolling) return;
    this.isScrolling = true;

    this.currentIndex = Math.min(this.currentIndex + 1, this.sections.length - 1);

    gsap.to(document.scrollingElement, {
      scrollTop: this.sections[this.currentIndex].offsetTop,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => { this.isScrolling = false; }
    });
  }

  onNavItemClick(index: number): void {
    if (this.isScrolling) return;
    this.isScrolling = true;
    this.currentIndex = index;

    gsap.to(document.scrollingElement, {
      scrollTop: this.sections[this.currentIndex].offsetTop,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => { this.isScrolling = false; }
    });
  }
}
