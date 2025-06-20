import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../../components/navbar-admin/navbar-admin.component';
import { DataService } from '../../../services/data.service';

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
  writingTasks: any;
  readingTasks: any;
  drawingTasks: any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getAllTasks().subscribe((data) => {
      console.log('Toutes les tâches récupérées:', data);
      this.writingTasks = data.writing;
      this.readingTasks = data.reading;
      this.drawingTasks = data.drawing;
    });

  }
}
