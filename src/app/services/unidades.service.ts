import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnidadesCreate } from '../models/unidades/unidades-create';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {
  urlBase: string = environment.urlBase;
  constructor(private http:HttpClient) { }

  public obtenerTodo(): Observable<UnidadesCreate[]> {
    return this.http.get<UnidadesCreate[]>(`${this.urlBase}/unit`);
  }
}
