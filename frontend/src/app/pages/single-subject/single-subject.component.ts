import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ForumService } from '../../services/forum/forum.service';

import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-single-subject',
  standalone: true,
  imports: [
    QuillModule,
    DatePipe,
    FormsModule,
    LoadingComponent
  ],
  templateUrl: './single-subject.component.html',
  styleUrl: './single-subject.component.css'
})
export class SingleSubjectComponent implements OnInit {
  id_subject!: number;
  currentSubject: any;
  postsInSubject: any;

  subjectResponse: any;
  postsResponse: any;

  newPostContent: string = '';

  isSubLoading = true;
  isPostLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private forumService: ForumService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id_subject = +params['id'];

      this.forumService.getAllSubjects().subscribe({
        next: (subjects) => {
          this.subjectResponse = subjects;

          this.currentSubject = this.subjectResponse.find(
            (element: any) => element.s_id === this.id_subject
          );
          this.isSubLoading = false;
        },
        error: (err) =>
          console.error('Erreur lors de la récupération du sujet', err)
      });

      this.forumService.getPostsBySubjectId(this.id_subject).subscribe({
        next: (posts) => {
          this.postsInSubject = posts.sort((a: any, b: any) => {
            return new Date(a.p_date).getTime() - new Date(b.p_date).getTime();
          });

          this.isPostLoading = false;
        },
        error: (err) =>
          console.error('Erreur lors de la récupération des posts', err)
      })
    });
  }

  sendPost() {
    if (this.newPostContent.trim() === '') {
      console.error('Le contenu du message est vide');
      return;
    }

    this.forumService.addPost({
      subjectId: this.id_subject,
      content: this.newPostContent
    }).subscribe({
      next: (response) => {
        console.log('Post ajouté :', response);
        this.newPostContent = '';

        window.location.reload();
      },
      error: (err) => console.error('Erreur lors de l\'ajout du post', err)
    });
  }
}
