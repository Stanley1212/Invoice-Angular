import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuplidoresCreateDto } from 'src/app/models/suplidores/suplidores-create-dto';
import { SuplidorService } from 'src/app/services/suplidor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-suplidor',
  templateUrl: './crear-suplidor.component.html',
  styleUrls: ['./crear-suplidor.component.css']
})
export class CrearSuplidorComponent implements OnInit {

  dataRef:SuplidoresCreateDto;

  constructor( public dialogRef: MatDialogRef<CrearSuplidorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuplidoresCreateDto,
    private suplidorService:SuplidorService) { 
      this.dataRef = data;
    }

  ngOnInit(): void {
  }

  
  guardarCambios(frm: NgForm){
    if (frm.invalid) {
      Object.values(frm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    if (this.dataRef.id > 0) {
    this.suplidorService.modificar(this.dataRef)
    .subscribe(result => {
      this.dialogRef.close();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Registro guardado correctamente !',
        showConfirmButton: false,
        timer: 1500
      })
    }, err=> {
      console.log(err);
      
      if (!err.message) {
        Swal.fire("Error",JSON.stringify(err),"error");
        return;
      }

      Swal.fire("Error",`${err.code} - ${err.message}`,"error");
    });
    }
    else {
    this.suplidorService.Crear(this.dataRef)
    .subscribe(result => {
      this.dialogRef.close();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Registro guardado correctamente !',
        showConfirmButton: false,
        timer: 1500
      })
    }, err=> {
      console.log(err);
      
      if (!err.error.message) {
        Swal.fire("Error",JSON.stringify(err),"error");
        return;
      }

      Swal.fire("Error",`${err.error.code} - ${err.error.message}`,"error");
    });
    }
  }

 onNoClick(): void {
    this.dialogRef.close();
  }

}
