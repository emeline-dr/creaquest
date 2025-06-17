import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataService } from '../../services/data.service';

import { UserSnippetComponent } from '../../components/user-snippet/user-snippet.component';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    UserSnippetComponent
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  username: string = '';
  email: string = '';
  avatar: string = '';
  password: string = '';

  avatarPreview = signal('');
  userProfile: any;

  constructor(
    private dataService: DataService
  ) {
    this.dataService.getUser().subscribe((data) => {
      this.userProfile = data

      this.username = this.userProfile.u_username;
      this.email = this.userProfile.u_email;
      this.avatar = this.userProfile.u_avatar;
      this.avatarPreview.set(this.userProfile.u_avatar)
    })
  }

  onAvatarInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.avatarPreview.set(input.value);
  }

  onSubmit() {
    const updatedData = {
      username: this.username,
      email: this.email,
      avatar: this.avatar,
      password: this.password
    };

    this.dataService.patchMyProfile(updatedData).subscribe(
      response => {
        console.log('Profil mis à jour avec succès', response);
      },
      error => {
        console.error('Erreur lors de la mise à jour du profil', error);
        // Gérer l'erreur
      }
    );
  }
}
