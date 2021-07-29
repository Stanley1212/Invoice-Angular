import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UnidadesCreate } from 'src/app/models/unidades/unidades-create';
import { UnidadesList } from 'src/app/models/unidades/unidades-list';
import { UnidadesService } from 'src/app/services/unidades.service';
import { CrearUnidadComponent } from '../crear-unidad/crear-unidad.component';
import {PageEvent} from '@angular/material/paginator';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-unidad-list',
  templateUrl: './unidad-list.component.html',
  styleUrls: ['./unidad-list.component.css']
})
export class UnidadListComponent implements OnInit {

  unidad:UnidadesCreate= new UnidadesCreate();
  unidadesList:Pagination<UnidadesList[]>=new Pagination<UnidadesList[]>();
  displayedColumns: string[] = ['Name', "Active","Acciones"];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;
  
  constructor(public dialog: MatDialog, private unidadService:UnidadesService) {
    this.cargarData(1,100);
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearUnidadComponent, {
      width: '35%',
      data:this.unidad
    });

    dialogRef.afterClosed().subscribe((result: UnidadesCreate) => {
      this.cargarData(1,100);
      this.unidad = new UnidadesCreate();
    });
  }
  update(element: UnidadesCreate) {
    this.unidad =element;
    this.openDialog();
  }
  
  borrar(id:number){
    this.unidadService.Eliminar(id).subscribe((resultData:Pagination<UnidadesList[]>)=>{
      this.cargarData(1,100);
    },err=>console.error(err));
  }
  
  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarData(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  cargarData(pagina: number, cantidadElementosAMostra) {
    this.unidadService.obtenerTodo(pagina,cantidadElementosAMostra).subscribe((resultData:Pagination<UnidadesList[]>)=>{
      this.unidadesList = resultData;
      this.cantidadTotalRegistros = resultData.totalRecords;
    });
  }
}
