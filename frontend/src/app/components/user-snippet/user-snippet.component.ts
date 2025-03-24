import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-snippet',
  standalone: true,
  imports: [],
  templateUrl: './user-snippet.component.html',
  styleUrl: './user-snippet.component.css'
})
export class UserSnippetComponent {
  userProfile: any;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getUser().subscribe({
      next: (profile) => this.userProfile = profile,
      error: (err) => console.error('Erreur lors de la récupération du profil', err)
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
