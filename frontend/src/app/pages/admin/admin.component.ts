import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NavbarAdminComponent } from '../../components/navbar-admin/navbar-admin.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NavbarAdminComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(
    private titleService: Title
  ) {
    this.titleService.setTitle("Créaquest - Panneau administratif");
  }
}
