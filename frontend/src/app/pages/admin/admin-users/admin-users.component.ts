import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

import { NavbarAdminComponent } from '../../../components/navbar-admin/navbar-admin.component';

import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    DatePipe,
    LucideAngularModule,
    NavbarAdminComponent
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  usersProfile: any;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getAllUsers().subscribe((data) => {
      this.usersProfile = data
    })
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
