import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Session } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  API_URL = 'http://localhost:8080/api/auth';

  #http = inject(HttpClient);
  constructor() { }

  login(form: any) {
    return this.#http.post(`${this.API_URL}/login`, form) 
  }

  logOut() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  register(form: any) {
    return this.#http.post(`${this.API_URL}/register`, form);
  }
}
