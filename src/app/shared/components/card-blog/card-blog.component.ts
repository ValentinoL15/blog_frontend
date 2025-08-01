import { Component, inject, Input, OnInit } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Blog } from '../../../interfaces/blog';
import { BlogService } from '../../../private/services/blog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-blog',
  imports: [MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './card-blog.component.html',
  styleUrl: './card-blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CardBlogComponent implements OnInit {

  @Input() blogs: Blog[] = [];

  blogService = inject(BlogService);

  constructor() { }

  ngOnInit(): void {
    
  }

  getBlogs(){
    this.blogService.getBlogs().subscribe({
      next: (res: Blog[]) => {
        this.blogs = res;
        console.log(this.blogs);
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
      }
    });
  }

}
