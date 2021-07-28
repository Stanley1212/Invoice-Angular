import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnidadesCreate } from 'src/app/models/unidades/unidades-create';

@Component({
  selector: 'app-crear-unidad',
  templateUrl: './crear-unidad.component.html',
  styleUrls: ['./crear-unidad.component.css']
})
export class CrearUnidadComponent implements OnInit {

  form:FormGroup;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CrearUnidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UnidadesCreate) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['',{
        validators: [Validators.required]
      }]
    });
  }

  guardarCambios() {

  }

  obtenerErrorCampoNombre() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
