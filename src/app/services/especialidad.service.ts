import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atencion } from '../models/atencion.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private URL: string = `http://localhost:8080/especialidades`

  constructor(private http: HttpClient) { }

  getEspecialidades(): Observable<Atencion[]> {
    return this.http.get<Atencion[]>(this.URL);
  }

  getEspecialidadById(id: string): Observable<Atencion> {
    return this.http.get<Atencion>(this.URL + `/${id}`)
  }

  updateEspecialidad(atencion: Atencion): Observable<Atencion> {
    return this.http.put<Atencion>(this.URL + `/${atencion.id}`, atencion);
  }
}
