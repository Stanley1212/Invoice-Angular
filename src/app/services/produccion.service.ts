import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../models/pagination';
import { ProduccionCreateDto } from '../models/produccion/produccion-create-dto';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {

  urlBase: string = environment.urlBase +"/Production";
  constructor(private http:HttpClient) { }

  public obtenerTodo(pagina: number, cantidadElementosAMostra): Observable<Pagination<ProduccionCreateDto[]>> {
    return this.http.get<Pagination<ProduccionCreateDto[]>>(`${this.urlBase}?pageSize=${cantidadElementosAMostra}&currentPage=${pagina}`);
  }

  public Crear(data:ProduccionCreateDto) {
    return this.http.post(this.urlBase,data);
  }

  public modificar(data:ProduccionCreateDto) {
    return this.http.put(this.urlBase,data);
  }

  public Eliminar(data:number) {
    console.log(data);
    return this.http.delete(`${this.urlBase}/${data}`);
  }
  
}
