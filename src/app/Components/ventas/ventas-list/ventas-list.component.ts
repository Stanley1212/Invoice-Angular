import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/pagination';
import { VentasCreateListDto } from 'src/app/models/ventas/ventas-create-list-dto';
import { VentasService } from 'src/app/services/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css']
})
export class VentasListComponent implements OnInit {

  List:Pagination<VentasCreateListDto[]>=new Pagination<VentasCreateListDto[]>();
  displayedColumns: string[] = ['ID', "Customer","Description","Discount", "Total" , "Active", "Acciones"];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(private ventasService:VentasService) { 
    this.cargarData(1,10);
  }

  ngOnInit(): void {
  }
  

  update(element) {
  }
  

  borrar(id:number){
    this.ventasService.Eliminar(id).subscribe(resultData=>{
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
    this.ventasService.obtenerTodo(pagina,cantidadElementosAMostra).subscribe((resultData:Pagination<VentasCreateListDto[]>)=>{
      this.List = resultData;
      this.cantidadTotalRegistros = resultData.totalRecords;
    });
  }
}
