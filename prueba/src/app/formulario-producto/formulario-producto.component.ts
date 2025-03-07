import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Laptop, laptopCreacion } from '../laptop.models';
import { LaptopService } from '../laptop.service';
import { nombreLaptopUnico } from '../compartidos/componentes/loading/funciones/nombreLaptopUnico';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-formulario-producto',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, MatProgressSpinnerModule],
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
    nombre: ['', {validators: [Validators.required],
      asyncValidators: [nombreLaptopUnico()],
      updateOn: 'blur'
    }]
  })

  obtenerErroresCampo(): string {
    let nombre = this.form.controls.nombre;

    if(nombre.hasError('required')){
      return 'El campo nombre es requerido'
    }

    if (nombre.hasError('mensaje')){
      return nombre.getError('mensaje')
    }
    return '';
  }

  guardarCambios(){
    let laptop = this.form.value as laptopCreacion;
    this.posteoForm.emit(laptop);
  }
}

