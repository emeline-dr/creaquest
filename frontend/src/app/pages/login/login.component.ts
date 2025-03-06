import { Component, ElementRef, ViewChild } from '@angular/core';
import { LogoNavComponent } from '../../components/logo-nav/logo-nav.component';
import { TitleCreaquestComponent } from '../../components/title-creaquest/title-creaquest.component';
import { Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LogoNavComponent,
    RouterModule,
    LucideAngularModule,
    CommonModule,
    ReactiveFormsModule,
    TitleCreaquestComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  @ViewChild('passwordInput') passwordInput!: ElementRef;
  isPasswordVisible = false;
  isPasswordInvisible = true;

  ngOnInit() {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (savedUsername && savedPassword) {
      this.loginForm.patchValue({
        username: savedUsername,
        password: savedPassword,
        rememberMe: true
      });
    }
  }

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.titleService.setTitle("Créaquest - Se connecter");
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password, rememberMe } = this.loginForm.value;
      this.dataService.login({ username, password }).subscribe(
        (response) => {
          if (response.status === "success") {
            localStorage.setItem("token", response.token);

            if (rememberMe) {
              localStorage.setItem("username", username);
              localStorage.setItem("password", password);
            } else {
              localStorage.removeItem("username");
              localStorage.removeItem("password");
            }

            window.location.href = '/index';
          } else {
            console.error('Erreur de connexion :', response.message);
          }
        },
        (error) => {
          console.error("Erreur :", error)
        }
      );
    }
  }

  viewPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.isPasswordInvisible = !this.isPasswordInvisible;

    if (this.passwordInput) {
      this.passwordInput.nativeElement.type = this.isPasswordVisible ? 'text' : 'password';
    }
  }
}
