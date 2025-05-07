import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ForumService } from '../../services/forum/forum.service';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {
  allCategories: any;
  allSubjects: any;
  allPosts: any;

  constructor(
    private titleService: Title,
    private forumService: ForumService
  ) {
    this.titleService.setTitle("Créaquest - Forum");
  }

  ngOnInit() {
    this.forumService.getAllCategories().subscribe({
      next: (categories) => {
        this.allCategories = categories
      },
      error: (err) => console.error('Erreur lors de la récupération des catégories', err)
    });

    this.forumService.getAllSubjects().subscribe({
      next: (subjects) => {
        this.allSubjects = subjects
      },
      error: (err) => console.error('Erreur lors de la récupération des catégories', err)
    });

    this.forumService.getAllPosts().subscribe({
      next: (posts) => {
        this.allPosts = posts
      },
      error: (err) => console.error('Erreur lors de la récupération des catégories', err)
    });
  }
}
