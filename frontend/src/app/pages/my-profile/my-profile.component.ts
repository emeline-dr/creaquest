import { Component } from '@angular/core';
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

  userLevel: number = 0;
  backgrounds = [
    { name: 'Aucun', unlockLevel: 0, imagePath: '' },
    { name: 'Background-Atlantide', unlockLevel: 5, imagePath: 'assets/images/backgrounds/Background-Atlantide.jpg' },
    { name: 'Background-Cyberpunk', unlockLevel: 10, imagePath: 'assets/images/backgrounds/Background-Cyberpunk.jpg' },
    { name: 'Background-Fantasy', unlockLevel: 15, imagePath: 'assets/images/backgrounds/Background-Fantasy.jpg' },
    { name: 'Background-SF', unlockLevel: 20, imagePath: 'assets/images/backgrounds/Background-SF.jpg' },
    { name: 'Background-Steampunk', unlockLevel: 25, imagePath: 'assets/images/backgrounds/Background-Steampunk.jpg' },
  ];
  selectedBackground: string | null = null;

  userProfile: any;

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.dataService.getUser().subscribe((data) => {
      this.userProfile = data

      this.username = this.userProfile.u_username;
      this.email = this.userProfile.u_email;
      this.avatar = this.userProfile.u_avatar;
      this.userLevel = this.userProfile.u_lvl;

      this.loadSelectedBackground();
    })
  }

  loadSelectedBackground() {
    const savedBackground = localStorage.getItem('selectedBackground');
    if (savedBackground) {
      this.selectedBackground = savedBackground;
    }
  }

  onAvatarInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.avatar = input.value;
  }

  onSubmit() {
    const updatedData = {
      username: this.username,
      email: this.email,
      avatar: this.avatar,
      password: this.password
    };

    const selectedBg = this.backgrounds.find(bg => bg.name === this.selectedBackground);

    if (this.selectedBackground === 'Aucun') {
      localStorage.removeItem('selectedBackground');
      this.selectedBackground = null;
    } else if (selectedBg && this.userLevel >= selectedBg.unlockLevel) {
      localStorage.setItem('selectedBackground', this.selectedBackground!);
    } else {
      localStorage.removeItem('selectedBackground');
      this.selectedBackground = null;
    }


    this.dataService.patchMyProfile(updatedData).subscribe(
      response => {
        console.log('Profil mis à jour avec succès', response);
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de la mise à jour du profil', error);
      }
    );
  }
}
