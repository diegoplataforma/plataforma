import { Component } from '@angular/core';
import { AppMainComponent} from './app.main.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    constructor(public app: AppMainComponent,
      private router: Router
      ) {}
}
