import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'error-handling';
  constructor(public router: Router) {
  }

  private logout() {
    if (localStorage.getItem("isLoggedIn")) {
      localStorage.removeItem("isLoggedIn");
      this.router.navigateByUrl("");
    }
  }

}
