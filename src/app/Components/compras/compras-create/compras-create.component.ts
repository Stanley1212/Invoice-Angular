import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticuloCreateDto } from 'src/app/models/articulo/articulo-create-dto';
import { ComprasDetailDto } from 'src/app/models/compras/compras-detail-dto';
import { ComprasListDto } from 'src/app/models/compras/compras-list-dto';
import { SuplidoresCreateDto } from 'src/app/models/suplidores/suplidores-create-dto';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ComprasService } from 'src/app/services/compras.service';
import { SuplidorService } from 'src/app/services/suplidor.service';
import Swal from 'sweetalert2';
import { BuscarComponent } from '../../shared/buscar/buscar.component';

@Component({
  selector: 'app-compras-create',
  templateUrl: './compras-create.component.html',
  styleUrls: ['./compras-create.component.css']
})
export class ComprasCreateComponent implements OnInit {

  displayedColumns: string[] = [
    'Acciones',
    'Producto',
    'Cantidad',
    'Precio',
    'Descuento',
    'Total',
  ];
  Object: ComprasListDto = new ComprasListDto();
  suplidores: SuplidoresCreateDto[] = [];
  articulos: ArticuloCreateDto[] = [];

  constructor(
    public dialog: MatDialog,
    private suplidorService: SuplidorService,
    private articuloService: ArticuloService,
    private comprasService: ComprasService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  guardarCambios(frm: NgForm) {
    if (frm.invalid) {
      Object.values(frm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    this.comprasService.Crear(this.Object).subscribe((result)=>{
      console.log(result);
      
      Swal.fire("Completado","Venta procesada con exito","success");
      this.router.navigate(["compras"]);
    },err=> {

      console.log(err);
      
      if (!err.error.message) {
        Swal.fire("Error",JSON.stringify(err),"error");
        return;
      }

      Swal.fire("Error",`${err.error.code} - ${err.error.message}`,"error");

    });
    

  }

  openSuplidor() {
    if (this.suplidores.length < 1) {
      this.suplidorService.obtenerActive().subscribe(
        (result: any) => {
          this.suplidores = result;
          this.openDialog(this.suplidores).subscribe(
            (cliente: any) => {
              if (!cliente) {
                return;
              }

              this.Object.supplierID = cliente.id;
              this.Object.supplier.name = cliente.name;
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
    } else {
      this.openDialog(this.suplidores).subscribe(
        (cliente: any) => {
          if (!cliente) {
            return;
          }

          this.Object.supplierID = cliente.id;
          this.Object.supplier.name = cliente.name;
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

  openArticulo() {
    if (this.articulos.length < 1) {
      this.articuloService.obtenerActive().subscribe(
        (result: any) => {
          this.articulos = result;

          this.openDialog(this.articulos).subscribe(
            (articulo: any) => {

              var newDetail: ComprasDetailDto = new ComprasDetailDto();

              if (!articulo) {
                return;
              }

              if (this.Object.billDetails.findIndex(f=>f.itemID === articulo.id) >=0) {
                return;
              }

              newDetail.itemID = articulo.id;
              newDetail.item = articulo;
              newDetail.price = articulo.purchasePrice;
              newDetail.quantity = 1;
              newDetail.discount = 0;
              newDetail.total = articulo.purchasePrice;

              this.Object.billDetails.unshift(newDetail);
              this.Object.billDetails = [...this.Object.billDetails];

              this.calcular();
            },
            (err) => {
              console.log(err);
              
              if (!err.message) {
                Swal.fire("Error",JSON.stringify(err),"error");
                return;
              }
        
              Swal.fire("Error",`${err.code} - ${err.message}`,"error");
            }
          );
        },
        (err) => console.error(err)
      );
    } else {
      this.openDialog(this.articulos).subscribe(
        (articulo: any) => {
          var newDetail: ComprasDetailDto = new ComprasDetailDto();

          if (!articulo) {
            return;
          }

          if (this.Object.billDetails.findIndex(f=>f.itemID === articulo.id) >=0) {
            return;
          }

          newDetail.itemID = articulo.id;
          newDetail.item = articulo;
          newDetail.price = articulo.purchasePrice;
          newDetail.quantity = 1;
          newDetail.discount = 0;
          newDetail.total = articulo.purchasePrice;

          this.Object.billDetails.unshift(newDetail);
          this.Object.billDetails = [...this.Object.billDetails];

          this.calcular();
        },
        (err) => {
          console.log(err);
          
          if (!err.message) {
            Swal.fire("Error",JSON.stringify(err),"error");
            return;
          }
    
          Swal.fire("Error",`${err.code} - ${err.message}`,"error");
        }
      );
    }
  }

  update(element) {
    this.Object.billDetails = [
      ...this.Object.billDetails.filter((f) => f.itemID !== element.itemID),
    ];
    element.total = element.quantity * element.price - element.discount;
    this.calcular();
  }

  change(element) {
    element.total = element.quantity * element.price - element.discount;
    this.calcular();
  }

  calcular() {
    this.Object.total = this.Object.billDetails.reduce(
      (a, b) => a + parseFloat(b.total.toString()),
      0
    );
    this.Object.discount = this.Object.billDetails.reduce(
      (a, b) => a + parseFloat(b.discount.toString()),
      0
    );
  }

  openDialog(data): any {
    const dialogRef = this.dialog.open(BuscarComponent, {
      width: '35%',
      data: data,
    });

    return dialogRef.afterClosed();
  }

}
