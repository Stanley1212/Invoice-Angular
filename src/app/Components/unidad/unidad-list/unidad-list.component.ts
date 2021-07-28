import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UnidadesCreate } from 'src/app/models/unidades/unidades-create';
import { UnidadesList } from 'src/app/models/unidades/unidades-list';
import { UnidadesService } from 'src/app/services/unidades.service';
import { CrearUnidadComponent } from '../crear-unidad/crear-unidad.component';

@Component({
  selector: 'app-unidad-list',
  templateUrl: './unidad-list.component.html',
  styleUrls: ['./unidad-list.component.css']
})
export class UnidadListComponent implements OnInit {

  unidadesCreate :UnidadesCreate= new UnidadesCreate();
  unidadesList: UnidadesList[];
  
  constructor(public dialog: MatDialog, private unidadService:UnidadesService) {
    
    this.unidadService.obtenerTodo().subscribe((resultData:any[])=>{
      console.log(resultData.data);
      this.unidadesList = resultData.data;
      console.log(this.unidadesList)
    });
   }

  ngOnInit(): void {
  }

  openDialog(): void {
    console.log("log");
    const dialogRef = this.dialog.open(CrearUnidadComponent, {
      width: '35%',
      data: this.unidadesCreate
    });

    dialogRef.afterClosed().subscribe((result: UnidadesCreate) => {
      console.log('The dialog was closed');
      this.unidadesCreate = result;
    });
  }

  cargarData() {

  }

}
