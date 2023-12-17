import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Especialidad } from '../../models/especialidad.model';
import { Medico } from '../../models/medico.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecialidadService } from '../../services/especialidad.service';
import { AtencionService } from '../../services/atencion.service';
import { MedicoService } from '../../services/medico.service';
import { Atencion } from '../../models/atencion.model';

@Component({
  selector: 'modificar',
  templateUrl: './modificar.component.html',
  styleUrl: './modificar.component.css'
})
export class ModificarComponent implements OnInit {
  formAtencion!: UntypedFormGroup;
  especialidades!: Especialidad[];
  medicos!: Medico[];

  private subscription = new Subscription();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private especialidadService: EspecialidadService,
    private atencionService: AtencionService,
    private medicoService: MedicoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.formAtencion = this.formBuilder.group({
      id: [],
      paciente: ['', Validators.required],
      documento: ['', Validators.required],
      especialidadId: ['', Validators.required],
      fecha: ['', Validators.required],
      medicoId: ['', Validators.required],
      costo: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.subscription.add(
      this.especialidadService.getEspecialidades().subscribe({
        next: (especialidades: any) => {
          this.especialidades = especialidades;
        },
        error: (error: any) => alert('Error al obtener especialidades - ' + error.message)
      })
    )

    this.subscription.add(
      this.formAtencion.controls['especialidadId'].valueChanges.subscribe({
        next: (valor: any) => {
          this.medicos = [];
          this.medicoService.getMedicos().subscribe({
            next: (medicos: Medico[]) => {
              // medicos.forEach(x => { if (x.idEspecialidad === valor) { this.medicos.push(x) } })
              this.medicos = medicos.filter(x => x.idEspecialidad == valor)
              console.log(this.medicos)
            }
          })
        },
        error: (error: any) => alert('Error al obtener medicos - ' + error.message)
      })
    )

    const id = this.activatedRoute.snapshot.params['id'];

    this.subscription.add(
      this.atencionService.getAtencionById(id).subscribe({
        next: (atencion: Atencion) => {
          this.formAtencion.patchValue(atencion)
        },
        error: (error: any) => alert('Error al obtener atención - ' + error.message)
      })
    )
  }

  guardar() {
    if(this.formAtencion.invalid){
      alert('Formulario inválido!')
      return;
    }

    this.subscription.add
  }
}
