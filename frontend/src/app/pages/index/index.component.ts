import { Component } from '@angular/core';
import { LogoNavComponent } from '../../components/logo-nav/logo-nav.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserSnippetComponent } from '../../components/user-snippet/user-snippet.component';
import { CopyrightComponent } from '../../components/copyright/copyright.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    LogoNavComponent,
    UserSnippetComponent,
    NavbarComponent,
    CopyrightComponent
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

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
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
}
