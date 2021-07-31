import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ComprasListDto } from 'src/app/models/compras/compras-list-dto';
import { Pagination } from 'src/app/models/pagination';
import { ComprasService } from 'src/app/services/compras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras-list',
  templateUrl: './compras-list.component.html',
  styleUrls: ['./compras-list.component.css']
})

export class ComprasListComponent implements OnInit {

  List:Pagination<ComprasListDto[]>=new Pagination<ComprasListDto[]>();
  displayedColumns: string[] = ['ID', "Supplier","Description","Discount", "Total" , "Active", "Acciones"];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(private comprasService:ComprasService) { 
    this.cargarData(1,10);
  }

  ngOnInit(): void {
  }
  

  update(element) {
  }
  

  borrar(id:number){
    this.comprasService.Eliminar(id).subscribe(resultData=>{
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
    this.comprasService.obtenerTodo(pagina,cantidadElementosAMostra).subscribe((resultData:Pagination<ComprasListDto[]>)=>{
      this.List = resultData;
      this.cantidadTotalRegistros = resultData.totalRecords;
    });
  }

}
