import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnidadesCreate } from 'src/app/models/unidades/unidades-create';
import { UnidadesService } from 'src/app/services/unidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-unidad',
  templateUrl: './crear-unidad.component.html',
  styleUrls: ['./crear-unidad.component.css']
})
export class CrearUnidadComponent implements OnInit {

  form:FormGroup;
  unidadesCreate :UnidadesCreate = new UnidadesCreate();

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CrearUnidadComponent>,
    private unidadService:UnidadesService,
    @Inject(MAT_DIALOG_DATA) public data: UnidadesCreate) { 
      this.unidadesCreate = data;
    
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',{
        validators: [Validators.required]
      }]
    });
  }

  guardarCambios(frm: NgForm) {
    if (frm.invalid) {
      Object.values(frm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    if (this.unidadesCreate.id > 0) {
    this.unidadService.modificar(this.unidadesCreate)
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
    this.unidadService.Crear(this.unidadesCreate)
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
