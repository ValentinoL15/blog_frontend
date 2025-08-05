import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Blog } from '../../../interfaces/blog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss'
})
export class BlogFormComponent implements OnInit,OnChanges{

  @Input() blogToEdit: Blog | null = null
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup
  fechaAhora = new Date().toISOString();

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
      this.form = this.fb.group({
      titulo: [this.blogToEdit?.titulo || '', Validators.required ],
      contenido: [this.blogToEdit?.contenido || '', Validators.required],
      etiqueta: [this.blogToEdit?.etiqueta || '', Validators.required],
      fecha_lanzamiento: [
      this.blogToEdit?.fecha_lanzamiento || this.fechaAhora,
      Validators.required
    ]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['blogToEdit'] && !changes['blogToEdit'].firstChange) {
      this.patchForm();
    }
  }

   private patchForm() {
    if (this.blogToEdit) {
      this.form.patchValue({
        titulo: this.blogToEdit.titulo,
        contenido: this.blogToEdit.contenido,
        etiqueta: this.blogToEdit.etiqueta,
        fecha_lanzamiento: this.blogToEdit.fecha_lanzamiento,
      });
    }
  }

  submit() {
    if (this.form.valid) {
      const blogData = this.form.value

      if(this.blogToEdit) {
        this.formSubmit.emit({ ...blogData, blog_id: this.blogToEdit.blog_id })
      } else {
        this.formSubmit.emit(blogData)
      }
      
    }
  }

}
