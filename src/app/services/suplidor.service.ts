import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../models/pagination';
import { SuplidoresCreateDto } from '../models/suplidores/suplidores-create-dto';

@Injectable({
  providedIn: 'root'
})
export class SuplidorService {

  urlBase: string = environment.urlBase +"/supplier";
  constructor(private http:HttpClient) { }

  public obtenerTodo(pagina: number, cantidadElementosAMostra): Observable<Pagination<SuplidoresCreateDto[]>> {
    return this.http.get<Pagination<SuplidoresCreateDto[]>>(`${this.urlBase}?pageSize=${cantidadElementosAMostra}&currentPage=${pagina}`);
  }

  public Crear(data:SuplidoresCreateDto) {
    return this.http.post(this.urlBase,data);
  }

  public modificar(data:SuplidoresCreateDto) {
    return this.http.put(this.urlBase,data);
  }

  public Eliminar(data:number) {
    console.log(data);
    
    return this.http.delete(`${this.urlBase}/${data}`);
  }
}
