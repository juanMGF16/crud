import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { LaptopService } from '../laptop.service';
import { Laptop, laptopCreacion } from '../laptop.models';
import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';
import { Router } from '@angular/router';
import { LoadingComponent } from "../compartidos/componentes/loading/loading.component";
import { extraerErrores } from '../compartidos/componentes/loading/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-editar-producto',
  imports: [FormularioProductoComponent, LoadingComponent, MostrarErroresComponent],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit{
  
  @Input({transform: numberAttribute})
  id!: number

  laptopService = inject(LaptopService);
  router = inject(Router);
  modelo?: Laptop;
  errores: string[] = [];

  ngOnInit(): void {
    this.laptopService.obtenerPorId(this.id).subscribe(laptop =>{
      this.modelo = laptop;
    })
  }

  guardarCambios(laptop: laptopCreacion){
    this.laptopService.actualizar(this.id, laptop).subscribe({next: () =>{
      this.router.navigate(['/laptops']);
    }, error: err => {
      const errores = extraerErrores(err);
      this.errores = errores;
    }})
  }
}
