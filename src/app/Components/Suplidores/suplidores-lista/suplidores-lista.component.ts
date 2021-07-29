import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/pagination';
import { SuplidoresCreateDto } from 'src/app/models/suplidores/suplidores-create-dto';
import { SuplidorService } from 'src/app/services/suplidor.service';
import { CrearSuplidorComponent } from '../crear-suplidor/crear-suplidor.component';

@Component({
  selector: 'app-suplidores-lista',
  templateUrl: './suplidores-lista.component.html',
  styleUrls: ['./suplidores-lista.component.css']
})
export class SuplidoresListaComponent implements OnInit {

  suplidor:SuplidoresCreateDto = new SuplidoresCreateDto();
  unidadesList:Pagination<SuplidoresCreateDto[]>=new Pagination<SuplidoresCreateDto[]>();
  displayedColumns: string[] = ['Name', "Phone","Address","Active","Acciones"];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(public dialog: MatDialog,private suplidorService:SuplidorService) {
    this.cargarData(1,100);
   }

  ngOnInit(): void {
  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearSuplidorComponent,{
      width: '35%',
      data:this.suplidor
    });

    dialogRef.afterClosed().subscribe((result: SuplidoresCreateDto) => {
      this.cargarData(1,100);
      this.suplidor = new SuplidoresCreateDto();
    });
  }

  update(element: SuplidoresCreateDto) {
    this.suplidor = element;
    this.openDialog();
  }
  
  borrar(id:number){
    this.suplidorService.Eliminar(id).subscribe((resultData:Pagination<SuplidoresCreateDto[]>)=>{
      this.cargarData(1,100);
    },err=>console.error(err));
  }
  
  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarData(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  cargarData(pagina: number, cantidadElementosAMostra) {
    this.suplidorService.obtenerTodo(pagina,cantidadElementosAMostra).subscribe((resultData:Pagination<SuplidoresCreateDto[]>)=>{
      this.unidadesList = resultData;
      this.cantidadTotalRegistros = resultData.totalRecords;
    });
  }

}
