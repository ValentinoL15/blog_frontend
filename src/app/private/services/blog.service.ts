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
}
