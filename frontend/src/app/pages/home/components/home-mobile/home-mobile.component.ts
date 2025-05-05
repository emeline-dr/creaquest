import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-mobile',
  standalone: true,
  imports: [
    RouterModule,
    LucideAngularModule
  ],
  templateUrl: './home-mobile.component.html',
  styleUrl: './home-mobile.component.css'
})
export class HomeMobileComponent {

}
