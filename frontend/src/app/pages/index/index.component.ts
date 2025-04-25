import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    FormsModule
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

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('viewCompletedTasks') === 'true') {
      this.viewCompletedTasks = true;
      this.isTaskCompleted = true;
    }

    this.dataService.getWritingTasks().subscribe({
      next: (writingTasks) => this.tasksWriting = writingTasks,
      error: (err) => console.error('Erreur lors de la récupération des tâches', err)
    });
    this.dataService.getCompletedWritingTasks().subscribe({
      next: (writingCompletedTasks) => this.tasksCompletedWriting = writingCompletedTasks,
      error: (err) => console.error('Erreur lors de la récupération des tâches', err)
    });

    this.dataService.getReadingTasks().subscribe({
      next: (readingTasks) => this.tasksReading = readingTasks,
      error: (err) => console.error('Erreur lors de la récupération des tâches', err)
    });
    this.dataService.getCompletedReadingTasks().subscribe({
      next: (readingCompletedTasks) => this.tasksCompletedReading = readingCompletedTasks,
      error: (err) => console.error('Erreur lors de la récupération des tâches', err)
    });

    this.dataService.getDrawingTasks().subscribe({
      next: (drawingTasks) => this.tasksDrawing = drawingTasks,
      error: (err) => console.error('Erreur lors de la récupération des tâches', err)
    });

    this.dataService.getCompletedDrawingTasks().subscribe({
      next: (drawingCompletedTasks) => this.tasksCompletedDrawing = drawingCompletedTasks,
      error: (err) => console.error('Erreur lors de la récupération des tâches', err)
    });
  }

  viewTasksCompleted() {
    this.viewCompletedTasks = !this.viewCompletedTasks;
    this.isTaskCompleted = !this.isTaskCompleted;

    localStorage.setItem('viewCompletedTasks', this.viewCompletedTasks.toString())
  }
}
