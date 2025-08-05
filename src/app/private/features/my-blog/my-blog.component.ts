import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../../interfaces/blog';
import { ToastrService } from 'ngx-toastr';
import { CardBlogComponent } from '../../../shared/components/card-blog/card-blog.component';
import { SpinnerService } from '../../../spinner.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-blog',
  imports: [HeaderComponent,CardBlogComponent, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './my-blog.component.html',
  styleUrl: './my-blog.component.scss'
})
export class MyBlogComponent implements OnInit{

  blogService = inject(BlogService)
  myBlogs$: Blog[] = []
  toastr = inject(ToastrService)
  spinner = inject(SpinnerService)

  ngOnInit(): void {
    this.getMyBlogs()
  }

  getMyBlogs() {
    this.blogService.getMyBlogs().subscribe({
      next: (res : Blog[]) => {
        this.myBlogs$ = res
        console.log(this.myBlogs$)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
