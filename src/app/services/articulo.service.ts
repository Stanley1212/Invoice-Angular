import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticuloCreateDto } from '../models/articulo/articulo-create-dto';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  urlBase: string = environment.urlBase +"/item";
  constructor(private http:HttpClient) { }

  public obtenerTodo(pagina: number, cantidadElementosAMostra): Observable<Pagination<ArticuloCreateDto[]>> {
    return this.http.get<Pagination<ArticuloCreateDto[]>>(`${this.urlBase}?pageSize=${cantidadElementosAMostra}&currentPage=${pagina}`);
  }

  public obtenerActive(): Observable<ArticuloCreateDto[]> {
    return this.http.get<ArticuloCreateDto[]>(`${this.urlBase}/all-Active`);
  }


  public Crear(data:ArticuloCreateDto) {
    return this.http.post(this.urlBase,data);
  }

  public modificar(data:ArticuloCreateDto) {
    return this.http.put(this.urlBase,data);
  }

  public Eliminar(data:number) {
    console.log(data);
    
    return this.http.delete(`${this.urlBase}/${data}`);
  }
}
