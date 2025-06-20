import { Component, AfterViewChecked } from '@angular/core';
import { NavbarAdminComponent } from '../../../components/navbar-admin/navbar-admin.component';
import { DataService } from '../../../services/data.service';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

declare var HSOverlay: any;

@Component({
  selector: 'app-admin-tasks',
  standalone: true,
  imports: [
    FormsModule,
    LucideAngularModule,
    NavbarAdminComponent
  ],
  templateUrl: './admin-tasks.component.html',
  styleUrl: './admin-tasks.component.css'
})
export class AdminTasksComponent implements AfterViewChecked {
  writingTasks: any;
  readingTasks: any;
  drawingTasks: any;

  showWritingTasks: boolean = false;
  showReadingTasks: boolean = false;
  showDrawingTasks: boolean = false;

  updatedTask: any = {};

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getAllTasks().subscribe((tasks: any[]) => {
      this.writingTasks = tasks
        .filter((task: any) => task.type === 'writing')

      this.readingTasks = tasks
        .filter((task: any) => task.type === 'reading')

      this.drawingTasks = tasks
        .filter((task: any) => task.type === 'drawing')
    });
  }

  ngAfterViewChecked() {
    HSOverlay.autoInit();
  }

  toggleWritingTasks() {
    this.showWritingTasks = !this.showWritingTasks;
  }

  toggleReadingTasks() {
    this.showReadingTasks = !this.showReadingTasks;
  }

  toggleDrawingTasks() {
    this.showDrawingTasks = !this.showDrawingTasks;
  }

  editTask(task: any) {
    this.updatedTask = { ...task };
  }

  updateTask(type: string, id: number, updatedTask: any) {
    let namePrefix = '';
    let descriptionPrefix = '';
    let expPrefix = '';

    if (type === 'writing') {
      namePrefix = 'w_';
      descriptionPrefix = 'w_';
      expPrefix = 'w_';
    } else if (type === 'reading') {
      namePrefix = 'r_';
      descriptionPrefix = 'r_';
      expPrefix = 'r_';
    } else if (type === 'drawing') {
      namePrefix = 'd_';
      descriptionPrefix = 'd_';
      expPrefix = 'd_';
    }

    const taskToUpdate = {
      [`${namePrefix}name`]: updatedTask.name || undefined,
      [`${descriptionPrefix}description`]: updatedTask.description || undefined,
      [`${expPrefix}exp`]: updatedTask.experience || undefined
    };

    this.dataService.updateTask(type, id, taskToUpdate).subscribe((response) => {
      if (type === 'writing') {
        const index = this.writingTasks.findIndex((task: any) => task.w_id === id);
        if (index !== -1) {
          this.writingTasks[index] = { ...this.writingTasks[index], ...taskToUpdate };
        }
      } else if (type === 'reading') {
        const index = this.readingTasks.findIndex((task: any) => task.r_id === id);
        if (index !== -1) {
          this.readingTasks[index] = { ...this.readingTasks[index], ...taskToUpdate };
        }
      } else if (type === 'drawing') {
        const index = this.drawingTasks.findIndex((task: any) => task.d_id === id);
        if (index !== -1) {
          this.drawingTasks[index] = { ...this.drawingTasks[index], ...taskToUpdate };
        }
      }
    });
  }


  deleteTask(type: string, id: number) {
    this.dataService.deleteTask(type, id).subscribe(() => {
      window.location.reload();
    });
  }
}
