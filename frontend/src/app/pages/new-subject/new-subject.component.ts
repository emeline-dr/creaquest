import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';

import { ForumService } from '../../services/forum/forum.service';

import { UserSnippetComponent } from '../../components/user-snippet/user-snippet.component';

@Component({
  selector: 'app-new-subject',
  standalone: true,
  imports: [
    UserSnippetComponent,
    QuillModule,
    FormsModule
  ],
  templateUrl: './new-subject.component.html',
  styleUrl: './new-subject.component.css'
})
export class NewSubjectComponent {
  categoryId!: number;
  newSubjectTitle: string = '';
  newSubjectContent: string = '';

  constructor(
    private forumService: ForumService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.categoryId = navigation?.extras?.state?.['categoryId'];

    console.log(this.categoryId)
  }

  createTopic() {
    if (!this.newSubjectTitle || !this.newSubjectContent) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    this.forumService.createSubjectWithPost(this.categoryId, this.newSubjectTitle, this.newSubjectContent)
      .subscribe({
        next: (response) => {
          alert('Sujet créé avec succès');

          this.router.navigate(['/forum/subject', response.subjectId]);
        },
        error: (err) => {
          console.error('Erreur lors de la création du sujet:', err);
          alert('Erreur lors de la création du sujet');
        }
      });
  }
}
