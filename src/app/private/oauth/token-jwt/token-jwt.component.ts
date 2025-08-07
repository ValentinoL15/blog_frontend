import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-token-jwt',
  imports: [],
  templateUrl: './token-jwt.component.html',
  styleUrl: './token-jwt.component.scss'
})
export class TokenJwtComponent implements OnInit{

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        // Guardar token en localStorage para usarlo luego
        localStorage.setItem('token', token);

        // Opcional: redirigir a la página principal o dashboard
        this.router.navigate(['/home']);
      } else {
        // Si no hay token, redirigir o mostrar error
        this.router.navigate(['/login']);
      }
    });
  }
  }

