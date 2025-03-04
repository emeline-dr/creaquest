import { Component } from '@angular/core';
import { LogoNavComponent } from '../../components/logo-nav/logo-nav.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    LogoNavComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
