import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DataService } from '../../services/data.service';

import { LoadingComponent } from '../../components/loading/loading.component';
import { UserSnippetComponent } from '../../components/user-snippet/user-snippet.component';

@Component({
  selector: 'app-memberlist',
  standalone: true,
  imports: [
    LoadingComponent,
    UserSnippetComponent
  ],
  templateUrl: './memberlist.component.html',
  styleUrl: './memberlist.component.css'
})
export class MemberlistComponent {
  allUsers: any;
  isLoading = true;

  constructor(
    private titleService: Title,
    private dataService: DataService
  ) {
    this.titleService.setTitle("Créaquest - Liste des membres");
  }

  ngOnInit() {
    this.dataService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users
        this.isLoading = false
      },
      error: (err) => console.error('Erreur lors de la récupération des utilisateurs', err)
    });
  }
}
