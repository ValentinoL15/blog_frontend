import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../public/auth/authentication.service';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { Router } from '@angular/router';
import { CardBlogComponent } from "../../../shared/components/card-blog/card-blog.component";
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../../interfaces/blog';
import { get } from 'http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CardBlogComponent, MatButton,NgIf],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  authService = inject(AuthenticationService);
  blogService = inject(BlogService);
  router = inject(Router);
  blogs$ : Blog[] = [];
  showCrearBlogButton = false;
  
  ngOnInit(): void {
    this.getBlogs();
    this.getToken();
    this.showCrearBlogButton = this.authService.hasRole('ROLE_AUTOR');
  }

  logOut(){ 
    this.authService.logOut();
    this.router.navigate(['/login']);
  }


  getToken() {
    this.authService.getToken();
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (res : Blog[]) => {
        this.blogs$ = res;
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
      }
    })
  }



}
