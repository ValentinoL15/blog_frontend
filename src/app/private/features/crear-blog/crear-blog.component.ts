import { Component, inject, OnInit } from '@angular/core';
import { BlogFormComponent } from "../../../shared/components/blog-form/blog-form.component";
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../../interfaces/blog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-blog',
  imports: [BlogFormComponent,HeaderComponent],
  templateUrl: './crear-blog.component.html',
  styleUrl: './crear-blog.component.scss'
})
export class CrearBlogComponent implements OnInit{

  blogSeleccionado: Blog | null = null;
  toastr = inject(ToastrService)
  router = inject(Router)
  route = inject(ActivatedRoute)
  blogService = inject(BlogService)

  id:any

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"]
      if(this.id) {
      this.blogService.getBlog(this.id).subscribe({
        next: (blog: Blog) => {this.blogSeleccionado = blog
          console.log("mi blog: ", blog)
        }
        ,
        error: (err) => console.log(err)
      })
    }
    })
  }

  guardarBlog(data: any) {

  if (this.blogSeleccionado) {
    // Editar
    this.blogService.updateBlog(this.blogSeleccionado.blog_id, data).subscribe({
      next: (res: Blog) => {
        this.toastr.success('Blog editado con éxito')
        this.router.navigate(['/myBlogs'])
      },
      error: (err : any) => {
        this.toastr.error(err.error.message || 'No se pudo editar el blog')
      }
    })
  } else {
    // Crear
    this.blogService.crearBlog(data).subscribe({
      next: (res: any) => {
        this.toastr.success('Blog creado con éxito', 'Éxito')
        this.router.navigate(['/myBlogs'])
      },
      error: (err:any) => {
        this.toastr.error('Error al crear el blog',)
        console.log("Erroraso:", err)
      }
    })
  }
}

}
