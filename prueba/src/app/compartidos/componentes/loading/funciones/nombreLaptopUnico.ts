import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { LaptopService } from "../../../../laptop.service";
import { catchError, map, Observable, of } from "rxjs";

export function nombreLaptopUnico(): AsyncValidatorFn{
    const laptopService = inject(LaptopService);

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if(control.pristine || !control.value){
            return of(null);
        }

        return laptopService.existePorNombre(control.value).pipe(
            map((existe)=>(existe ? {mensaje: "Ya existe una laptop con este nombre"}: null)),
            catchError(() => of(null))
        )
    }
}