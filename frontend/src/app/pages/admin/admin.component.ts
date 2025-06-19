import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NavbarAdminComponent } from '../../components/navbar-admin/navbar-admin.component';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterModule,
    NavbarAdminComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  tasksCount: any;
  latestUsers: any;

  constructor(
    private titleService: Title,
    private dataService: DataService
  ) {
    this.titleService.setTitle("Créaquest - Panneau administratif");

    this.dataService.getCountTasks().subscribe((data) => {
      this.tasksCount = data;
    })

    this.dataService.getAllUsers().subscribe((data) => {
      this.latestUsers = data
        .sort((a: any, b: any) => new Date(b.u_registered_at).getTime() - new Date(a.u_registered_at).getTime())
        .slice(0, 5);
    })
  }
}
