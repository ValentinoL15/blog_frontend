import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Blog } from '../../../interfaces/blog';
import { BlogService } from '../../../private/services/blog.service';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-card-blog',
  imports: [MatButtonModule, MatCardModule, CommonModule, MatFormFieldModule, MatIconModule, MatInputModule, RouterLink],
  templateUrl: './card-blog.component.html',
  styleUrl: './card-blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CardBlogComponent implements OnInit {

  @Input() blogs: Blog[] = [];
  @Input() mostrarAcciones = false;
  @Output() blogEliminado = new EventEmitter<number>();

  blogService = inject(BlogService);
  toastr = inject(ToastrService)
  router = inject(Router)

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

  deleteBlog(id:any){
    this.blogService.deletBlog(id).subscribe({
      next: (res : any) => {
        this.toastr.success('Blog eliminado con éxito', 'Hecho')
        this.blogEliminado.emit(id); // ✅ Emitimos el ID eliminado al padre
        this.router.navigate(['/home'])
      },
      error: (err : any) => {
        this.toastr.error("Error al eliminar el blog", "Error")
        console.log(err)
      }
    })
  }

}
