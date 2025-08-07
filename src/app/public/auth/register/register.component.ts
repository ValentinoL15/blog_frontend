import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  imports: [MatButtonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  showPassword = false;
  router = inject(Router);
  authService = inject(AuthenticationService);
  toastr = inject(ToastrService);
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rolesList: ['', Validators.required]
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  back() {
    this.router.navigate(['/login']);
  }

  register() {
    const formulario = {
      username: this.form.value.username,
      password: this.form.value.password,
      rolesList: [{ id: Number(this.form.value.rolesList) }]
    }
     if (this.form.invalid) {
    this.toastr.error('Completa todos los campos', 'Error');
    this.form.markAllAsTouched(); // hace que se marquen todos como "tocados"
    return;
  }
    
    this.authService.register(formulario).subscribe({
      next: (res: any) => {
        console.log('Registration successful', res);
        this.router.navigate(['/login']);
        this.toastr.success('Usuario registrado con éxito', 'Success');
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.toastr.error(err.error.message || 'No se puedo registrar');
      }
    })
  }

}
