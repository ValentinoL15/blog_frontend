import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../../public/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  authService = inject(AuthenticationService);
  router = inject(Router);

  logOut(){ 
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
