import { Especialidad } from "./especialidad.model"

export interface Atencion {
    id: string;
    paciente: string;
    documento: number;
    especialidadId: string;
    medicoId: string;
    costo: number;
    fecha: Date;

    especialidad: Especialidad;
}