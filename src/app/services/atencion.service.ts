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
}
