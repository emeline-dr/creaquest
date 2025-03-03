import { Component, ElementRef, ViewChild } from '@angular/core';
import { LogoNavComponent } from '../../components/logo-nav/logo-nav.component';
import { Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LogoNavComponent,
    RouterModule,
    LucideAngularModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  isPasswordVisible = false;
  isPasswordInvisible = true;

  constructor(private titleService: Title) {
    this.titleService.setTitle("Créaquest - Se connecter");
  }

  viewPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.isPasswordInvisible = !this.isPasswordInvisible;

    if (this.passwordInput) {
      this.passwordInput.nativeElement.type = this.isPasswordVisible ? 'text' : 'password';
    }
  }
}
