import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

declare var HSOverlay: any;
declare const HSStaticMethods: any;

import { AuthService } from '../../services/auth/auth.service';
import { DataService } from '../../services/data.service';

import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    FormsModule,
    LoadingComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  tasksWriting: any;
  tasksCompletedWriting: any;
  tasksReading: any;
  tasksCompletedReading: any;
  tasksDrawing: any;
  tasksCompletedDrawing: any;

  isTaskCompleted = false;
  viewCompletedTasks = false;

  isWritingTaskLoading = true;
  isDrawingTaskLoading = true;
  isReadingTaskLoading = true;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private titleService: Title,
  ) {
    this.titleService.setTitle("Créaquest - Index");
  }

  ngOnInit(): void {
    if (localStorage.getItem('viewCompletedTasks') === 'true') {
      this.viewCompletedTasks = true;
      this.isTaskCompleted = true;
    }

    this.dataService.getWritingTasks().subscribe({
      next: (writingTasks) => {
        this.tasksWriting = writingTasks
        this.isWritingTaskLoading = false

        setTimeout(() => {
          HSOverlay.autoInit();
        });
      },
      error: (err) => console.error('Erreur lors de la récupération des tâches', err)
    });
    this.dataService.getCompletedWritingTasks().subscribe({
      next: (writingCompletedTasks) => this.tasksCompletedWriting = writingCompletedTasks,
      error: (err) => console.error('Erreur lors de la récupération des tâches', err)
    });

    this.dataService.getReadingTasks().subscribe({
      next: (readingTasks) => {
        this.tasksReading = readingTasks
        this.isReadingTaskLoading = false

        setTimeout(() => {
          HSOverlay.autoInit();
        });
      },
      error: (err) => console.error('Erreur lors de la récupération des tâches', err)
    });
    this.dataService.getCompletedReadingTasks().subscribe({
      next: (readingCompletedTasks) => this.tasksCompletedReading = readingCompletedTasks,
      error: (err) => console.error('Erreur lors de la récupération des tâches', err)
    });

    this.dataService.getDrawingTasks().subscribe({
      next: (drawingTasks) => {
        this.tasksDrawing = drawingTasks
        this.isDrawingTaskLoading = false

        setTimeout(() => {
          HSOverlay.autoInit();
        });
      },
      error: (err) => console.error('Erreur lors de la récupération des tâches', err)
    });

    this.dataService.getCompletedDrawingTasks().subscribe({
      next: (drawingCompletedTasks) => this.tasksCompletedDrawing = drawingCompletedTasks,
      error: (err) => console.error('Erreur lors de la récupération des tâches', err)
    });
  }

  ngAfterViewInit(): void {
    HSStaticMethods?.autoInit?.();
  }

  viewTasksCompleted() {
    this.viewCompletedTasks = !this.viewCompletedTasks;
    this.isTaskCompleted = !this.isTaskCompleted;

    localStorage.setItem('viewCompletedTasks', this.viewCompletedTasks.toString())
  }

  validateTask(taskId: number, taskType: string) {
    const userId = Number(this.authService.getUserId());
    if (taskType === 'writing') {
      this.dataService.validateWritingTasks(userId, taskId).subscribe({
        next: response => {
          console.log('Tâche validée', response)
          window.location.reload();
        },
        error: err => console.error('Erreur', err)
      });
    }

    if (taskType === 'reading') {
      this.dataService.validateReadingTasks(userId, taskId).subscribe({
        next: response => {
          console.log('Tâche validée', response)
          window.location.reload();
        },
        error: err => console.error('Erreur', err)
      });
    }

    if (taskType === 'drawing') {
      this.dataService.validateDrawingTasks(userId, taskId).subscribe({
        next: response => {
          console.log('Tâche validée', response)
          window.location.reload();
        },
        error: err => console.error('Erreur', err)
      });
    }
  }
}
