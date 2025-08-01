import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  API_URL = 'http://localhost:8080/api/auth';
    private jwtHelper = new JwtHelperService();

  #http = inject(HttpClient);
  constructor() { }

  login(form: any) {
    return this.#http.post(`${this.API_URL}/login`, form) 
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
