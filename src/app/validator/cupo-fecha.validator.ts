import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';

import { catchError, map, Observable, of } from 'rxjs';

import { AtencionService } from '../services/atencion.service';

@Injectable({
  providedIn: 'root',
})
export class CuotaAtencionValidator implements AsyncValidator {
  private readonly ATENCIONES_MAXIMAS_POR_DIA = 3;

  constructor(private atencionService: AtencionService) {}
  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.atencionService.getAtenciones().pipe(
      map(
        (respuesta) =>
          respuesta.filter((atencion) => atencion.fecha === control.value)
            ?.length >= this.ATENCIONES_MAXIMAS_POR_DIA
      ),
      map((excedeCuota) =>
        excedeCuota ? ({ cuotaExcedida: true } as ValidationErrors) : null
      ),
      catchError(() => of(null))
    );
  }
}
