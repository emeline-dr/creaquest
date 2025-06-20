import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

declare var HSOverlay: any;

import { NavbarAdminComponent } from '../../../components/navbar-admin/navbar-admin.component';

import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DatePipe,
    LucideAngularModule,
    NavbarAdminComponent
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  usersProfile: any;

  originalUser: any = {};
  username: string = '';
  email: string = '';
  avatar: string = '';
  password: string = '';

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getAllUsers().subscribe((data) => {
      this.usersProfile = data

      setTimeout(() => {
        HSOverlay.autoInit();
      });
    })
  }

  onAvatarInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.avatar = input.value;
  }

  openEditModal(user: any) {
    this.username = user.u_username;
    this.email = user.u_email;
    this.avatar = user.u_avatar;
    this.password = '';
    this.originalUser = { ...user };
  }

  updateUser(userId: number) {
    const updatedData: any = {};

    if (this.username !== this.originalUser.u_username) {
      updatedData.username = this.username;
    }

    if (this.email !== this.originalUser.u_email) {
      updatedData.email = this.email;
    }

    if (this.avatar !== this.originalUser.u_avatar) {
      updatedData.avatar = this.avatar;
    }

    if (this.password) {
      updatedData.password = this.password;
    }

    console.log('ID de l\'utilisateur à mettre à jour :', userId);

    if (updatedData.username || updatedData.email || updatedData.avatar || updatedData.password) {
      this.dataService.patchProfile(updatedData, userId).subscribe({
        next: () => {
          console.log('Utilisateur mis à jour avec succès');
          window.location.reload();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour :', err);
        }
      });
    } else {
      console.log('Aucun champ n\'a été modifié.');
    }
  }

  deleteUser(id: number) {
    this.dataService.deleteUser(id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
      }
    });
  }
}
