import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Laptop, laptopCreacion } from '../laptop.models';
import { LaptopService } from '../laptop.service';

@Component({
  selector: 'app-formulario-producto',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  @Input({required: true})
  titulo!: string;

  @Input()
  modelo?: Laptop
  @Output()
  posteoForm = new EventEmitter<laptopCreacion>();

  ngOnInit(): void {
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  form = this.formBuilder.group({
    nombre: ['']
  })
  guardarCambios(){
    let laptop = this.form.value as laptopCreacion;
    this.posteoForm.emit(laptop);
  }
}
