import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  displayedColumns: string[] = ['Name'];
  buscarText:string="";

  constructor(public dialogRef: MatDialogRef<BuscarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any[]) { }

  ngOnInit(): void {
  }

  Seleccionado(item) {
    this.dialogRef.close(item);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buscar() {
    let arreglo:any[] = [];

    for (let item of this.data) {
      let name = item.name.toLocaleLowerCase();
      if (name.indexOf(this.buscarText.toLocaleLowerCase()) >=0) {
        arreglo.push(item);
      }      
    }

    if (this.buscarText.trim() === "") {
      return this.data;
    }

    return arreglo;
  }
}
