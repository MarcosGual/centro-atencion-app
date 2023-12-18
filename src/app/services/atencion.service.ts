import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atencion } from '../models/atencion.model';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  private readonly URL: string = 'http://localhost:8080/atenciones'

  constructor(private http: HttpClient) { }

  getAtenciones(): Observable<Atencion[]> {
    return this.http.get<Atencion[]>(this.URL);
  }

  getAtencionById(id: string): Observable<Atencion> {
    return this.http.get<Atencion>(this.URL + '/' + id);
  }

  updateAtencion(atencion: Atencion): Observable<Atencion> {
    return this.http.put<Atencion>(this.URL + `/${atencion.id}`, atencion);
  }

  createAtencion(atencion:Atencion):Observable<Atencion>{
    return this.http.post<Atencion>(this.URL, atencion);
  }

  deleteAtencion(idAtencion: string):Observable<Atencion>{
    return this.http.delete<Atencion>(this.URL + '/' + idAtencion);
  }
}
