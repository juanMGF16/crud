import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { LaptopService } from '../laptop.service';
import { laptopCreacion } from '../laptop.models';
import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';
import { extraerErrores } from '../compartidos/componentes/loading/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";


@Component({
  selector: 'app-crear-producto',
  imports: [FormularioProductoComponent, MostrarErroresComponent],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {
  laptopService = inject(LaptopService)
  router = inject(Router)
  errores: string[] = [];

  guardarCambios(laptop: laptopCreacion){
    this.laptopService.crear(laptop).subscribe({
      next: () => {
        this.router.navigate(["productos"])
      },
      error: err =>{
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    })
  }
}
