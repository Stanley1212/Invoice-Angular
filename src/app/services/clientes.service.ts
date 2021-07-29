import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientesCreateDto } from '../models/clientes/clientes-create-dto';
import { ClientesListDto } from '../models/clientes/clientes-create-list-dto';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  urlBase: string = environment.urlBase +"/Customer";
  constructor(private http:HttpClient) { }

  public obtenerTodo(pagina: number, cantidadElementosAMostra): Observable<Pagination<ClientesListDto[]>> {
    return this.http.get<Pagination<ClientesListDto[]>>(`${this.urlBase}?pageSize=${cantidadElementosAMostra}&currentPage=${pagina}`);
  }

  public Crear(data:ClientesCreateDto) {
    return this.http.post(this.urlBase,data);
  }

  public modificar(data:ClientesCreateDto) {
    return this.http.put(this.urlBase,data);
  }

  public Eliminar(data:number) {
    console.log(data);
    
    return this.http.delete(`${this.urlBase}/${data}`);
  }
}
