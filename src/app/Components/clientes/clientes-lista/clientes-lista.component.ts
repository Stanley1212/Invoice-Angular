import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ClientesCreateDto } from 'src/app/models/clientes/clientes-create-dto';
import { ClientesListDto } from 'src/app/models/clientes/clientes-create-list-dto';
import { Pagination } from 'src/app/models/pagination';
import { ClientesService } from 'src/app/services/clientes.service';
import { CrearClientesComponent } from '../crear-clientes/crear-clientes.component';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  cliente:ClientesCreateDto = new ClientesCreateDto();
  unidadesList:Pagination<ClientesListDto[]>=new Pagination<ClientesListDto[]>();
  displayedColumns: string[] = ['Name', "Phone","Address","Active","Acciones"];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(public dialog: MatDialog,private clienteService:ClientesService) {
    this.cargarData(1,100);
   }

  ngOnInit(): void {
  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearClientesComponent, {
      width: '35%',
      data:this.cliente
    });

    dialogRef.afterClosed().subscribe((result: ClientesCreateDto) => {
      this.cargarData(1,100);
      this.cliente = new ClientesCreateDto();
    });
  }

  update(element: ClientesCreateDto) {
    this.cliente = element;
    this.openDialog();
  }
  
  borrar(id:number){
    this.clienteService.Eliminar(id).subscribe((resultData:Pagination<ClientesListDto[]>)=>{
      this.cargarData(1,100);
    },err=>console.error(err));
  }
  
  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarData(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  cargarData(pagina: number, cantidadElementosAMostra) {
    this.clienteService.obtenerTodo(pagina,cantidadElementosAMostra).subscribe((resultData:Pagination<ClientesListDto[]>)=>{
      this.unidadesList = resultData;
      this.cantidadTotalRegistros = resultData.totalRecords;
    });
  }

}
