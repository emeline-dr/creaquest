import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ForumService } from '../../services/forum/forum.service';

import { LoadingComponent } from '../../components/loading/loading.component';
import { UserSnippetComponent } from '../../components/user-snippet/user-snippet.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    RouterModule,
    DatePipe,
    LoadingComponent,
    UserSnippetComponent
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {
  allCategories: any;
  allSubjects: any;
  allPosts: any;
  linkedSubjects: any[] = [];

  isCatLoading = true;
  isSubLoading = true;
  isPostLoading = true;

  constructor(
    private titleService: Title,
    private forumService: ForumService
  ) {
    this.titleService.setTitle("Créaquest - Forum");
  }

  ngOnInit() {
    this.forumService.getAllCategories().subscribe({
      next: (categories) => {
        this.allCategories = categories;
        this.isCatLoading = false;
      },
      error: (err) => console.error('Erreur lors de la récupération des catégories', err)
    });

    this.forumService.getAllSubjects().subscribe({
      next: (subjects) => {
        this.allSubjects = subjects;
        this.tryLinkSubjectsWithPosts();

        this.isSubLoading = false;
      },
      error: (err) => console.error('Erreur lors de la récupération des catégories', err)
    });

    this.forumService.getAllPosts().subscribe({
      next: (posts) => {
        this.allPosts = posts;
        this.tryLinkSubjectsWithPosts();

        this.isPostLoading = false;
      },
      error: (err) => console.error('Erreur lors de la récupération des catégories', err)
    });
  }

  tryLinkSubjectsWithPosts() {
    if (!this.allSubjects || !this.allPosts) {
      console.warn("Subjects ou posts pas encore chargés");
      return;
    }

    const enrichedSubjects = this.allSubjects.map((subject: any) => {
      const postsForSubject = this.allPosts
        .filter((post: any) => post.p_subject_id === subject.s_id)
        .sort((a: any, b: any) => new Date(b.p_date).getTime() - new Date(a.p_date).getTime());

      const lastPost = postsForSubject[0];

      return {
        ...subject,
        lastPost
      };
    });

    this.linkedSubjects = enrichedSubjects
      .filter((s: any) => s.lastPost)
      .sort((a: any, b: any) => new Date(b.lastPost.p_date).getTime() - new Date(a.lastPost.p_date).getTime())
      .slice(0, 5);
  }
}
