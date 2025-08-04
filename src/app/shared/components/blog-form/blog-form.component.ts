import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Blog } from '../../../interfaces/blog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss'
})
export class BlogFormComponent implements OnInit{

  @Input() blogToEdit: Blog | null = null
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
      this.form = this.fb.group({
      titulo: [this.blogToEdit?.titulo || '', Validators.required ],
      contenido: [this.blogToEdit?.contenido || '', Validators.required],
      etiqueta: [this.blogToEdit?.etiqueta || '', Validators.required],
    })
  }

  submit() {
    if (this.form.valid) {
      const blogData = this.form.value

      const fechaAhora = new Date().toISOString();

        const dataParaEnviar = {
      ...blogData,
      fecha_lanzamiento: fechaAhora,
    };

      if(this.blogToEdit) {
        this.formSubmit.emit({ ...blogData, blog_id: this.blogToEdit.blog_id })
      } else {
        this.formSubmit.emit(dataParaEnviar)
      }
      
    }
  }

}
