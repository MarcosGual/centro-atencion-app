import { Component } from '@angular/core';
import { AtencionService } from '../../services/atencion.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { Atencion } from '../../models/atencion.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
})
export class ListadoComponent {
  lista?: Atencion[];

  private subscription = new Subscription();

  constructor(
    private atencionService: AtencionService,
    private especialidadService: EspecialidadService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.especialidadService.getEspecialidades().subscribe({
        next: (especialidades: any) => {
          this.atencionService.getAtenciones().subscribe({
            next: (atenciones: any) => {
              atenciones.forEach((atencion: Atencion) => {
                const indice = especialidades.findIndex(
                  (x: any) => x.id === atencion.especialidadId
                );
                atencion.especialidad = especialidades[indice];
              });
              this.lista = atenciones;
            },
            error: (error: any) =>
              console.log('Error al obtener atenciones - ' + error.message),
          });
        },
        error: (error: any) =>
          console.log('Error al obtener atenciones - ' + error.message),
      })
    );
  }

  parseToDate(date: string) {
    return Date.parse(date);
  }

  eliminarAtencion(idAtencion: string) {
    if (confirm('¿Está seguro de eliminar esta atención?')) {
      this.subscription.add(
        this.atencionService.deleteAtencion(idAtencion).subscribe({
          next: (atencion: Atencion) => {
            this.lista = this.lista?.filter((x) => x.id !== idAtencion);
            console.log(this.lista)
            alert('Atención eliminada exitosamente!');
          },
          error: (error: any) => {
            alert('Error al eliminar atención - ' + error.message);
          },
        })
      );
    }
  }
}
