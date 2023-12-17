import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private readonly URL: string = 'http://localhost:8080/medicos';

  constructor(private http: HttpClient) { }

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.URL);
  }
}
