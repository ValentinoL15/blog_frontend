import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  showPassword = false;
  router = inject(Router);

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  back() {
    this.router.navigate(['/login']);
  }

}
