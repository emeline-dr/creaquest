import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LogoNavComponent } from '../../components/logo-nav/logo-nav.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    LogoNavComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Créaquest - S'inscrire");
  }
}
