import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoNavComponent } from '../../components/logo-nav/logo-nav.component';
import { TitleCreaquestComponent } from '../../components/title-creaquest/title-creaquest.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    LogoNavComponent,
    ReactiveFormsModule,
    RouterModule,
    TitleCreaquestComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerError: boolean = false;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.titleService.setTitle("Créaquest - S'inscrire");

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      passwordBis: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  register() {
    if (this.registerForm.valid) {
      const { username, password, passwordBis, email } = this.registerForm.value;

      this.dataService.register({ username, password, passwordBis, email }).subscribe(
        (response) => {
          if (response.status === "success") {
            window.location.href = '/login?registration=success'
          } else {
            this.registerError = true;
          }
        },
        (error) => {
          console.error("Erreur :", error)
        }
      );
    }
  }
}
