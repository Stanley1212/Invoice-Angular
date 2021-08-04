import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComprasListDto } from '../models/compras/compras-list-dto';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})

export class ComprasService {
  urlBase: string = environment.urlBase +"/Bill";
  constructor(private http:HttpClient) { }

  public obtenerTodo(pagina: number, cantidadElementosAMostra): Observable<Pagination<ComprasListDto[]>> {
    return this.http.get<Pagination<ComprasListDto[]>>(`${this.urlBase}?pageSize=${cantidadElementosAMostra}&currentPage=${pagina}`);
  }

  public obtenerById(id: number): Observable<ComprasListDto> {
    return this.http.get<ComprasListDto>(`${this.urlBase}/${id}`);
  }

  public Crear(data:ComprasListDto) {
    return this.http.post(this.urlBase,data);
  }

  public modificar(data:ComprasListDto) {
    return this.http.put(this.urlBase,data);
  }

  public Eliminar(data:number) {
    console.log(data);
    return this.http.delete(`${this.urlBase}/${data}`);
  }
  
}
