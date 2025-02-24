import { Component, ElementRef, OnInit, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() currentIndex: number = 0;  // Recevoir l'index actuel
  @Output() navItemClick: EventEmitter<number> = new EventEmitter<number>();

  private sections: HTMLElement[] = [];
  private navItems!: NodeListOf<HTMLElement>;
  private isScrolling = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.navItems = this.elRef.nativeElement.querySelectorAll('.nav-item');
    this.sections = Array.from(document.querySelectorAll('section'));
    this.setupNavClickListeners();
    this.setupIntersectionObserver();
  }

  ngOnInit(): void {
    const hostElement = this.elRef.nativeElement;
    const parentElement = hostElement.parentElement;

    if (parentElement && parentElement.classList.length > 0) {
      const parentClass = Array.from(parentElement.classList).find((cls) =>
        (cls: string) => cls.endsWith('Block')
      );

      if (typeof parentClass === 'string') {
        const navClass = parentClass.replace('Block', 'Nav');
        const navBarElement = hostElement.querySelector('.navBar');

        if (navBarElement) {
          this.renderer.addClass(navBarElement, navClass);
        }
      }
    }
  }

  private setupIntersectionObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = this.sections.indexOf(entry.target as HTMLElement);
            this.updateActiveNavItem(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.sections.forEach(section => observer.observe(section));
  }

  private updateActiveNavItem(index: number): void {
    this.navItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  private updateCurrentIndexOnNavClick(targetSection: HTMLElement): void {
    const index = this.sections.indexOf(targetSection);
    if (index !== -1) {
      this.currentIndex = index;
    }
  }

  private setupNavClickListeners(): void {
    this.navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        const targetSection = document.getElementById(targetId!);

        if (targetSection && !this.isScrolling) {
          const targetIndex = this.sections.indexOf(targetSection);

          if (targetIndex !== -1) {
            this.navItemClick.emit(targetIndex);

            this.isScrolling = true;

            gsap.to(document.scrollingElement, {
              scrollTop: targetSection.offsetTop,
              duration: 1,
              ease: 'power2.inOut',
              onComplete: () => { this.isScrolling = false; }
            });
          }
        }
      });
    });
  }
}
