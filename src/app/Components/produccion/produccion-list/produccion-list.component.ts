import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/pagination';
import { ProduccionCreateDto } from 'src/app/models/produccion/produccion-create-dto';
import { ProduccionService } from 'src/app/services/produccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produccion-list',
  templateUrl: './produccion-list.component.html',
  styleUrls: ['./produccion-list.component.css']
})
export class ProduccionListComponent implements OnInit {

  List:Pagination<ProduccionCreateDto[]>=new Pagination<ProduccionCreateDto[]>();
  displayedColumns: string[] = ['ID', "Item","Unit","Quantity", "Active", "Acciones"];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(private produccionService:ProduccionService) { 
    this.cargarData(1,10);
  }

  ngOnInit(): void {
  }
  

  update(element) {
  }
  

  borrar(id:number){
    this.produccionService.Eliminar(id).subscribe(resultData=>{
      this.cargarData(1,10);
    },err=>{
      console.log(err);
      
      if (!err.error.message) {
        Swal.fire("Error",JSON.stringify(err),"error");
        return;
      }

      Swal.fire("Error",`${err.error.code} - ${err.error.message}`,"error");
    });
  }
  
  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarData(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  
  cargarData(pagina: number, cantidadElementosAMostra) {
    this.produccionService.obtenerTodo(pagina,cantidadElementosAMostra).subscribe((resultData:Pagination<ProduccionCreateDto[]>)=>{
      this.List = resultData;
      this.cantidadTotalRegistros = resultData.totalRecords;
    });
  }
}
