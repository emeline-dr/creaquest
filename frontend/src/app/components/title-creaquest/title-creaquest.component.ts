import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title-creaquest',
  standalone: true,
  imports: [],
  templateUrl: './title-creaquest.component.html',
  styleUrl: './title-creaquest.component.css'
})
export class TitleCreaquestComponent {
  classStroke = '';

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    if (this.route.url === '/login') {
      this.classStroke = 'stroke-blue-dark'
    }

    if (this.route.url === '/register') {
      this.classStroke = 'stroke-blue'
    }
  }
}
