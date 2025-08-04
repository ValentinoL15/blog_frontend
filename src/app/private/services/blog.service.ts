import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../../interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  API_URL = 'http://localhost:8080/api/blogs';

  #http = inject(HttpClient);

  constructor() { }

  getBlogs(): Observable<Blog[]> {
    return this.#http.get<Blog[]>(this.API_URL);
  }

  getBlogByEtiqueta(etiqueta:string): Observable<Blog[]> {
    return this.#http.get<Blog[]>(`${this.API_URL}/contenido/${etiqueta}`)
  }

  getMyBlogs(): Observable<Blog[]> {
    return this.#http.get<Blog[]>(`${this.API_URL}/myBlogs`)
  }

  crearBlog(form:any): Observable<any> {
    return this.#http.post<any>(`${this.API_URL}/crear-blog`, form)
  }

  updateBlog(id:any, form:Blog): Observable<Blog> {
    return this.#http.put<Blog>(`${this.API_URL}/editar-blog/${id}`, form)
  }
}
