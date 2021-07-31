import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesCreateDto } from 'src/app/models/clientes/clientes-create-dto';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-clientes',
  templateUrl: './crear-clientes.component.html',
  styleUrls: ['./crear-clientes.component.css']
})
export class CrearClientesComponent implements OnInit {

  cliente:ClientesCreateDto;

  constructor( public dialogRef: MatDialogRef<CrearClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientesCreateDto,
    private clienteService:ClientesService) { 
      this.cliente = data;
    }

  ngOnInit(): void {
  }

  
  guardarCambios(frm: NgForm){
    if (frm.invalid) {
      Object.values(frm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    if (this.cliente.id > 0) {
    this.clienteService.modificar(this.cliente)
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
    else {
    this.clienteService.Crear(this.cliente)
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
