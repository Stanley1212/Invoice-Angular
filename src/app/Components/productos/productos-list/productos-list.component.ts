import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ArticuloCreateDto } from 'src/app/models/articulo/articulo-create-dto';
import { Pagination } from 'src/app/models/pagination';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CrearproductosComponent } from '../crearproductos/crearproductos.component';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit {

  dataRef:ArticuloCreateDto = new ArticuloCreateDto();
  unidadesList:Pagination<ArticuloCreateDto[]>=new Pagination<ArticuloCreateDto[]>();
  displayedColumns: string[] = ['Name', "Stock","SalePrice","PurchasePrice", "Type" ,"Unit", "Active", "Acciones"];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(public dialog: MatDialog,private articuloService:ArticuloService) { 
    this.cargarData(1,100);
  }

  ngOnInit(): void {
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(CrearproductosComponent,{
      width: '35%',
      data:this.dataRef
    });

    dialogRef.afterClosed().subscribe((result: ArticuloCreateDto) => {
      this.cargarData(1,100);
      this.dataRef = new ArticuloCreateDto();
    });
  }

  update(element: ArticuloCreateDto) {
    this.dataRef = element;
    this.openDialog();
  }
  
  borrar(id:number){
    this.articuloService.Eliminar(id).subscribe((resultData:Pagination<ArticuloCreateDto[]>)=>{
      this.cargarData(1,100);
    },err=>console.error(err));
  }
  
  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarData(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  cargarData(pagina: number, cantidadElementosAMostra) {
    this.articuloService.obtenerTodo(pagina,cantidadElementosAMostra).subscribe((resultData:Pagination<ArticuloCreateDto[]>)=>{
      this.unidadesList = resultData;
      this.cantidadTotalRegistros = resultData.totalRecords;
    });
  }

}
