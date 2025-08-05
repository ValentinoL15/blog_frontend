import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  API_URL = 'http://localhost:8080/api/auth';
    private jwtHelper = new JwtHelperService();

  #http = inject(HttpClient);
  router = inject(Router)
  constructor() { }

  login(form: any) {
    return this.#http.post(`${this.API_URL}/login`, form).pipe(
      tap((response: any) => {
        if(response.jwt) {
          localStorage.setItem('token', response.jwt)
        }
      })
    ) 
  }

 hasRole(role: string): boolean {
  const token = this.getToken();
  if (token) {
    const decodedToken: any = this.jwtHelper.decodeToken(token);
    const roles = decodedToken.authorities || [];
    return roles.includes(role);
  }
  return false;
}

getUserRole() {
  const token = this.getToken();
  if (token) {
    try {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
  return null;
}

 logOut() {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}

getToken() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('token');
  }
  return null;
}

  register(form: any) {
    return this.#http.post(`${this.API_URL}/register`, form);
  }
}
