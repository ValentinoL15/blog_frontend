import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../../../public/auth/authentication.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [MatIconModule, CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

showCrearBlogButton = false;
authService = inject(AuthenticationService)

ngOnInit(): void {
  this.showCrearBlogButton = this.authService.hasRole('ROLE_AUTOR');
}

logOut(){
  this.authService.logOut()
}

}
