import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Session } from 'inspector';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  router = inject(Router);
  authService = inject(AuthenticationService);
  toastr = inject(ToastrService)
  form: FormGroup;

  constructor(private fb:FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {

      if (this.form.invalid) {
    this.form.markAllAsTouched(); // para que muestre todos los errores
    return;
  }

    const formulario = {
      username: this.form.value.username,
      password: this.form.value.password  
    }
    this.authService.login(formulario).subscribe({
      next: (res : any) => {
        localStorage.setItem('token', res.jwt);
        this.router.navigate(['/home']);
        this.toastr.success('Login successful', 'Success');
      },
      error: (err) => {
        console.error('Login failed', err);
        this.toastr.error(err.error.message || 'No se pudo iniciar sesión');
      }
    })
  }

 loginWithGoogle() {
  window.location.href = 'http://localhost:8080/oauth2/authorization/google';
}

  goRegister() {
    this.router.navigate(['/register']);
  }

}
