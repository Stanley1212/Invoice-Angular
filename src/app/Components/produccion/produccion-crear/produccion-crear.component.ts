import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticuloCreateDto } from 'src/app/models/articulo/articulo-create-dto';
import { ProduccionCreateDto, ProductionDetail } from 'src/app/models/produccion/produccion-create-dto';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProduccionService } from 'src/app/services/produccion.service';
import { VentasService } from 'src/app/services/ventas.service';
import Swal from 'sweetalert2';
import { BuscarComponent } from '../../shared/buscar/buscar.component';

@Component({
  selector: 'app-produccion-crear',
  templateUrl: './produccion-crear.component.html',
  styleUrls: ['./produccion-crear.component.css']
})
export class ProduccionCrearComponent implements OnInit {

  displayedColumns: string[] = [
    'Acciones',
    'Producto',
    'Cantidad'
  ];
  Object: ProduccionCreateDto = new ProduccionCreateDto();
  articulos: ArticuloCreateDto[] = [];

  constructor(
    public dialog: MatDialog,
    private articuloService: ArticuloService,
    private produccionService: ProduccionService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  guardarCambios(frm: NgForm) {
    if (frm.invalid) {
      Object.values(frm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    this.produccionService.Crear(this.Object).subscribe(()=>{
      Swal.fire("Completado","procesada finalizado con exito","success");
      this.router.navigate(["produccion"]);
    },err=> {
      console.log(err);
      
      if (!err.message) {
        Swal.fire("Error",JSON.stringify(err),"error");
        return;
      }

      Swal.fire("Error",`${err.code} - ${err.message}`,"error");
    });
    

  }

  openArticulo() {
    if (this.articulos.length < 1) {
      this.articuloService.obtenerActive().subscribe(
        (result: ArticuloCreateDto[]) => {
          this.articulos = result;

          this.openDialog(this.articulos.filter(f=> f.type === 1)).subscribe(
            (articulo: any) => {

              if (!articulo) {
                return;
              }

              this.Object.itemID = articulo.id;
              this.Object.item = articulo;
              this.Object.quantity = 1;
            },
            (err) =>{
            console.log(err);
            
            if (!err.error.message) {
              Swal.fire("Error",JSON.stringify(err),"error");
              return;
            }
      
            Swal.fire("Error",`${err.error.code} - ${err.error.message}`,"error");
          });
        },
        (err) => console.error(err)
      );
    } else {
      this.openDialog(this.articulos.filter(f=> f.type === 1)).subscribe(
        (articulo: any) => {
          if (!articulo) {
            return;
          }

          this.Object.itemID = articulo.id;
          this.Object.item = articulo;
          this.Object.quantity = 1;
        },
        (err) => {
          console.log(err);
          
          if (!err.error.message) {
            Swal.fire("Error",JSON.stringify(err),"error");
            return;
          }
    
          Swal.fire("Error",`${err.error.code} - ${err.error.message}`,"error");
        }
      );
    }
  }

  openProArticulo() {
    if (this.articulos.length < 1) {
      this.articuloService.obtenerActive().subscribe(
        (result: ArticuloCreateDto[]) => {
          this.articulos = result;

          this.openDialog(this.articulos.filter(f=> f.type === 2 && f.stock > 0)).subscribe(
            (articulo: any) => {
              var newDetail: ProductionDetail = new ProductionDetail();

              if (!articulo) {
                return;
              }

              if (this.Object.productionDetails.findIndex(f=>f.itemID === articulo.id) >=0) {
                return;
              }

              newDetail.itemID = articulo.id;
              newDetail.item = articulo;
              newDetail.quantity = 1;

              this.Object.productionDetails.unshift(newDetail);
              this.Object.productionDetails = [...this.Object.productionDetails];
            },
            (err) =>{
            console.log(err);
            
            if (!err.error.message) {
              Swal.fire("Error",JSON.stringify(err),"error");
              return;
            }
      
            Swal.fire("Error",`${err.error.code} - ${err.error.message}`,"error");
          });
        },
        (err) => console.error(err)
      );
    } else {
      this.openDialog(this.articulos.filter(f=> f.type === 2 && f.stock > 0)).subscribe(
        (articulo: any) => {
          var newDetail: ProductionDetail = new ProductionDetail();

          if (!articulo) {
            return;
          }

          if (this.Object.productionDetails.findIndex(f=>f.itemID === articulo.id) >=0) {
            return;
          }

          newDetail.itemID = articulo.id;
          newDetail.item = articulo;
          newDetail.quantity = 1;

          this.Object.productionDetails.unshift(newDetail);
          this.Object.productionDetails = [...this.Object.productionDetails];
        },
        (err) => {
          console.log(err);
          
          if (!err.error.message) {
            Swal.fire("Error",JSON.stringify(err),"error");
            return;
          }
    
          Swal.fire("Error",`${err.error.code} - ${err.error.message}`,"error");
        }
      );
    }
  }

  update(element) {
    this.Object.productionDetails = [
      ...this.Object.productionDetails.filter((f) => f.itemID !== element.itemID),
    ];
  }

  change(element) {

    if (element.quantity > element.item.stock) {
      Swal.fire("Advertencia",`El produco no cuenta con suficiente cantidad, disponible ${element.item.stock}`,"warning");
      element.quantity = element.item.stock;
    }
  }

  /*calcular() {
    this.Object.total = this.Object.invoiceDetails.reduce(
      (a, b) => a + parseFloat(b.total.toString()),
      0
    );
    this.Object.discount = this.Object.invoiceDetails.reduce(
      (a, b) => a + parseFloat(b.discount.toString()),
      0
    );
  }*/

  openDialog(data): any {
    const dialogRef = this.dialog.open(BuscarComponent, {
      width: '35%',
      data: data,
    });

    return dialogRef.afterClosed();
  }
}
