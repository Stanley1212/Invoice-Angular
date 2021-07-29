import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticuloCreateDto } from 'src/app/models/articulo/articulo-create-dto';
import { UnidadesCreate } from 'src/app/models/unidades/unidades-create';
import { UnidadesList } from 'src/app/models/unidades/unidades-list';
import { ArticuloService } from 'src/app/services/articulo.service';
import { UnidadesService } from 'src/app/services/unidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crearproductos',
  templateUrl: './crearproductos.component.html',
  styleUrls: ['./crearproductos.component.css']
})
export class CrearproductosComponent implements OnInit {

  dataRef:ArticuloCreateDto;
  unidades:UnidadesList[];
  validateSelect:boolean=false;
  selectFormControl = new FormControl('', Validators.required)
  selectFormControl2 = new FormControl('', Validators.required)
  
  constructor(public dialogRef: MatDialogRef<ArticuloCreateDto>,
    @Inject(MAT_DIALOG_DATA) public data: ArticuloCreateDto,
    private service:ArticuloService,
    private unitService:UnidadesService) { 
      this.dataRef = data;

      this.unitService.obtenerActivas().subscribe((result:UnidadesList[]) => {
        this.unidades = result;
      });
    }

  ngOnInit(): void {
  }

  guardarCambios(frm: NgForm){
    if (frm.invalid) {
      Object.values(frm.controls).forEach((control) => control.markAsTouched());
      return;
    }
    
    if (this.dataRef.id > 0) {
    this.service.modificar(this.dataRef)
    .subscribe(result => {
      this.dialogRef.close();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Registro guardado correctamente !',
        showConfirmButton: false,
        timer: 1500
      })
    }, err=> console.error(err));
    }
    else {
    this.service.Crear(this.dataRef)
    .subscribe(result => {
      this.dialogRef.close();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Registro guardado correctamente !',
        showConfirmButton: false,
        timer: 1500
      })
    }, err=> console.error(err));
    }
  }

 onNoClick(): void {
    this.dialogRef.close();
  }

}
