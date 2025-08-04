import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../../interfaces/blog';
import { ToastrService } from 'ngx-toastr';
import { CardBlogComponent } from '../../../shared/components/card-blog/card-blog.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CommonModule, NgIf } from '@angular/common';
import { LoadingService } from '../../../public/auth/loading.service';
import { SpinnerService } from '../../../spinner.service';
import { AuthenticationService } from '../../../public/auth/authentication.service';

@Component({
  selector: 'app-blogs',
  imports: [CardBlogComponent,HeaderComponent, CommonModule, NgIf],
  standalone:true,
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent implements OnInit{

  etiqueta: string = '';
  blogs$: Blog[] = [];

  route = inject(ActivatedRoute);
  blogService = inject(BlogService);
  authService = inject(AuthenticationService)
  toastr = inject(ToastrService)
  spinner = inject(SpinnerService);

ngOnInit(): void {
  this.route.params.subscribe((params) => {
    this.etiqueta = params["etiqueta"];
    this.getBlogsByEtiqueta()
  });
}

getBlogsByEtiqueta() {
  this.blogService.getBlogByEtiqueta(this.etiqueta).subscribe({
    next: (res:Blog[]) => {
      this.blogs$ = res
      console.log(this.blogs$)
    },
    error: (err) => {
      this.toastr.error("No se encuentran los blogs")
    }
  })
}

}
