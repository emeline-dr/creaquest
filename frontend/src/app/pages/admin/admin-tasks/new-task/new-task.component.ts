import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  taskType: string = 'writing';
  newTask = {
    name: '',
    description: '',
    experience: 0
  };

  constructor(private dataService: DataService) { }

  createNewTask() {
    const { name, description, experience } = this.newTask;

    this.dataService.createTask({
      taskType: this.taskType,
      title: name,
      description: description,
      exp: experience
    }).subscribe(response => {
      console.log('Tâche créée avec succès!', response);
      window.location.reload();
    }, error => {
      console.error('Erreur lors de la création de la tâche', error);
    });
  }
}
