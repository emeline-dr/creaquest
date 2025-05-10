import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { ForumService } from '../../services/forum/forum.service';

@Component({
  selector: 'app-single-subject',
  standalone: true,
  imports: [
    QuillModule
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
        },
        error: (err) =>
          console.error('Erreur lors de la récupération du sujet', err)
      });

      this.forumService.getPostsBySubjectId(this.id_subject).subscribe({
        next: (posts) => {
          this.postsInSubject = posts.sort((a: any, b: any) => {
            return new Date(a.p_date).getTime() - new Date(b.p_date).getTime();
          });
        },
        error: (err) =>
          console.error('Erreur lors de la récupération des posts', err)
      })
    });
  }
}
