import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticuloCreateDto } from 'src/app/models/articulo/articulo-create-dto';
import { ClientesListDto } from 'src/app/models/clientes/clientes-create-list-dto';
import { VentasCreateListDto } from 'src/app/models/ventas/ventas-create-list-dto';
import { VentasDetailDto } from 'src/app/models/ventas/ventas-detail-dto';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { VentasService } from 'src/app/services/ventas.service';
import Swal from 'sweetalert2';
import { BuscarComponent } from '../../shared/buscar/buscar.component';

@Component({
  selector: 'app-ventas-create',
  templateUrl: './ventas-create.component.html',
  styleUrls: ['./ventas-create.component.css'],
})
export class VentasCreateComponent implements OnInit {
  displayedColumns: string[] = [
    'Acciones',
    'Producto',
    'Cantidad',
    'Precio',
    'Descuento',
    'Total',
  ];
  Object: VentasCreateListDto = new VentasCreateListDto();
  clientes: ClientesListDto[] = [];
  articulos: ArticuloCreateDto[] = [];

  constructor(
    public dialog: MatDialog,
    private clienteService: ClientesService,
    private articuloService: ArticuloService,
    private ventaService: VentasService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  guardarCambios(frm: NgForm) {
    if (frm.invalid) {
      Object.values(frm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    this.ventaService.Crear(this.Object).subscribe(()=>{
      Swal.fire("Completado","Venta procesada con exito","success");
      this.router.navigate(["ventas"]);
    },err=> {
      console.log(err);
      
      if (!err.message) {
        Swal.fire("Error",JSON.stringify(err),"error");
        return;
      }

      Swal.fire("Error",`${err.code} - ${err.message}`,"error");
    });
    

  }

  openCliente() {
    if (this.clientes.length < 1) {
      this.clienteService.obtenerActive().subscribe(
        (result: any) => {
          this.clientes = result;
          this.openDialog(this.clientes).subscribe(
            (cliente: any) => {
              if (!cliente) {
                return;
              }

              this.Object.customerID = cliente.id;
              this.Object.customer.name = cliente.name;
            },
            (err) => console.error(err)
          );
        },
        (err) => console.error(err)
      );
    } else {
      this.openDialog(this.clientes).subscribe(
        (cliente: any) => {
          if (!cliente) {
            return;
          }

          this.Object.customerID = cliente.id;
          this.Object.customer.name = cliente.name;
        },
        (err) => console.error(err)
      );
    }
  }

  openArticulo() {
    if (this.articulos.length < 1) {
      this.articuloService.obtenerActive().subscribe(
        (result: ArticuloCreateDto[]) => {
          this.articulos = result.filter(f=> f.type === 1 && f.stock > 0);

          this.openDialog(this.articulos).subscribe(
            (articulo: any) => {
              var newDetail: VentasDetailDto = new VentasDetailDto();

              if (!articulo) {
                return;
              }

              if (this.Object.invoiceDetails.findIndex(f=>f.itemID === articulo.id) >=0) {
                return;
              }

              newDetail.itemID = articulo.id;
              newDetail.item = articulo;
              newDetail.price = articulo.salePrice;
              newDetail.quantity = 1;
              newDetail.discount = 0;
              newDetail.total = articulo.salePrice;

              this.Object.invoiceDetails.unshift(newDetail);
              this.Object.invoiceDetails = [...this.Object.invoiceDetails];

              this.calcular();
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
      this.openDialog(this.articulos).subscribe(
        (articulo: any) => {
          var newDetail: VentasDetailDto = new VentasDetailDto();

          if (!articulo) {
            return;
          }

          if (this.Object.invoiceDetails.findIndex(f=>f.itemID === articulo.id) >=0) {
            return;
          }

          newDetail.itemID = articulo.id;
          newDetail.item = articulo;
          newDetail.price = articulo.salePrice;
          newDetail.quantity = 1;
          newDetail.discount = 0;
          newDetail.total = articulo.salePrice;

          this.Object.invoiceDetails.unshift(newDetail);
          this.Object.invoiceDetails = [...this.Object.invoiceDetails];

          this.calcular();
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
    this.Object.invoiceDetails = [
      ...this.Object.invoiceDetails.filter((f) => f.itemID !== element.itemID),
    ];
    element.total = element.quantity * element.price - element.discount;
    this.calcular();
  }

  change(element) {

    if (element.quantity > element.item.stock) {
      Swal.fire("Advertencia",`El produco no cuenta con suficiente cantidad, disponible ${element.item.stock}`,"warning");
      element.quantity = element.item.stock;
    }

    element.total = element.quantity * element.price - element.discount;
    this.calcular();
  }

  calcular() {
    this.Object.total = this.Object.invoiceDetails.reduce(
      (a, b) => a + parseFloat(b.total.toString()),
      0
    );
    this.Object.discount = this.Object.invoiceDetails.reduce(
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
