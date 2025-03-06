import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-logo-nav',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './logo-nav.component.html',
  styleUrl: './logo-nav.component.css'
})
export class LogoNavComponent {
  routeUrl = '';

  constructor(
    private route: Router
  ) {
  }

  ngOnInit() {
    if (this.route.url === "/login" || this.route.url === "/register" || this.route.url === "/login?registration=success") {
      this.routeUrl = "/home";
    } else {
      this.routeUrl = "/index";
    }
  }
}
