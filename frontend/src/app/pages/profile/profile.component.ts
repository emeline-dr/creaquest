import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data.service';

import { UserSnippetComponent } from '../../components/user-snippet/user-snippet.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    UserSnippetComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userProfile: any;

  userMedal = '';
  medalLevels = [
    { max: 5, medal: "Medal-Default" },
    { max: 10, medal: "Medal-Bronze" },
    { max: 15, medal: "Medal-Silver" },
    { max: 20, medal: "Medal-Gold" },
  ];

  constructor(
    private titleService: Title,
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.dataService.getUserById(userId).subscribe((user) => {
        this.userProfile = user;
        this.titleService.setTitle(`Créaquest - Profil de ${user.u_username}`);

        const userLvl = this.userProfile.u_lvl
        let medal = 'Medal-Diamond'

        for (const tier of this.medalLevels) {
          if (userLvl < tier.max) {
            medal = tier.medal;
            break;
          }
        }

        this.userMedal = `assets/images/medals/${medal}.png`;
      });
    }
  }
}
