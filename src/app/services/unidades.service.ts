import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../models/pagination';
import { UnidadesCreate } from '../models/unidades/unidades-create';
import { UnidadesList } from '../models/unidades/unidades-list';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {
  urlBase: string = environment.urlBase +"/unit";
  constructor(private http:HttpClient) { }

  public obtenerTodo(pagina: number, cantidadElementosAMostra): Observable<Pagination<UnidadesList[]>> {
    return this.http.get<Pagination<UnidadesList[]>>(`${this.urlBase}?pageSize=${cantidadElementosAMostra}&currentPage=${pagina}`);
  }

  public obtenerActivas(): Observable<UnidadesList[]> {
    return this.http.get<UnidadesList[]>(`${this.urlBase}/all-Active`);
  }

  public Crear(data:UnidadesCreate) {
    return this.http.post(this.urlBase,data);
  }

  public modificar(data:UnidadesCreate) {
    return this.http.put(this.urlBase,data);
  }

  public Eliminar(data:number) {
    console.log(data);
    
    return this.http.delete(`${this.urlBase}/${data}`);
  }
}
