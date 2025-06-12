import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ForumService } from '../../services/forum/forum.service';

import { LoadingComponent } from '../../components/loading/loading.component';
import { UserSnippetComponent } from '../../components/user-snippet/user-snippet.component';

@Component({
  selector: 'app-single-categorie',
  standalone: true,
  imports: [
    RouterModule,
    DatePipe,
    LoadingComponent,
    UserSnippetComponent
  ],
  templateUrl: './single-categorie.component.html',
  styleUrl: './single-categorie.component.css'
})
export class SingleCategorieComponent implements OnInit {
  id_categorie!: number;
  currentCategory: any;
  subjectInThisCategory: any;
  lastPost: any;
  categorieName: any;

  isCatLoading = true;
  isSubPostLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private forumService: ForumService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id_categorie = +params['id'];
      this.forumService.getSubjectsByCategoryId(this.id_categorie).subscribe({
        next: (subjects) => {
          this.subjectInThisCategory = subjects;

          this.lastPost = {};
          this.categorieName = this.subjectInThisCategory.c_title

          // Pour chaque sujet, récupérer les posts et stocker le dernier
          this.subjectInThisCategory.forEach((subject: any) => {
            this.forumService.getPostsBySubjectId(subject.s_id).subscribe({
              next: (posts) => {
                if (posts && posts.length > 0) {
                  const last = posts.sort((a: any, b: any) =>
                    new Date(b.p_date).getTime() - new Date(a.p_date).getTime()
                  )[0];

                  // Stocker le dernier post pour ce sujet
                  this.lastPost[subject.s_id] = last;
                }
                this.isSubPostLoading = false;
              },
              error: (err) =>
                console.error(`Erreur lors de la récupération des posts pour le sujet ${subject.s_id}`, err)
            });
          });
        },
        error: (err) =>
          console.error('Erreur lors de la récupération des sujets de cette catégorie', err)
      });
    });
  }
}
