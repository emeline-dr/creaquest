import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../../components/navbar-admin/navbar-admin.component';

@Component({
  selector: 'app-admin-tasks',
  standalone: true,
  imports: [
    NavbarAdminComponent
  ],
  templateUrl: './admin-tasks.component.html',
  styleUrl: './admin-tasks.component.css'
})
export class AdminTasksComponent {

}
