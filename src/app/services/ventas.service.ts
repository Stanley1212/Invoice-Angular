import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../models/pagination';
import { VentasCreateListDto } from '../models/ventas/ventas-create-list-dto';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  urlBase: string = environment.urlBase +"/Invoice";
  constructor(private http:HttpClient) { }

  public obtenerTodo(pagina: number, cantidadElementosAMostra): Observable<Pagination<VentasCreateListDto[]>> {
    return this.http.get<Pagination<VentasCreateListDto[]>>(`${this.urlBase}?pageSize=${cantidadElementosAMostra}&currentPage=${pagina}`);
  }

  public obtenerById(id: number): Observable<VentasCreateListDto> {
    return this.http.get<VentasCreateListDto>(`${this.urlBase}/${id}`);
  }

  public Crear(data:VentasCreateListDto) {
    return this.http.post(this.urlBase,data);
  }

  public modificar(data:VentasCreateListDto) {
    return this.http.put(this.urlBase,data);
  }

  public Eliminar(data:number) {
    console.log(data);
    return this.http.delete(`${this.urlBase}/${data}`);
  }
  
}
