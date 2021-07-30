import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/pagination';
import { VentasCreateListDto } from 'src/app/models/ventas/ventas-create-list-dto';
import { VentasService } from 'src/app/services/ventas.service';
import { BuscarComponent } from '../../shared/buscar/buscar.component';

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
    this.cargarData(1,100);
  }

  ngOnInit(): void {
  }
  

  update(element) {
  }
  

  borrar(id:number){
    this.ventasService.Eliminar(id).subscribe(resultData=>{
      this.cargarData(1,100);
    },err=>console.error(err));
  }
  
  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarData(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  
  cargarData(pagina: number, cantidadElementosAMostra) {
    this.ventasService.obtenerTodo(pagina,cantidadElementosAMostra).subscribe((resultData:Pagination<VentasCreateListDto[]>)=>{
      console.log(resultData);
      
      this.List = resultData;
      this.cantidadTotalRegistros = resultData.totalRecords;
    });
  }
}
