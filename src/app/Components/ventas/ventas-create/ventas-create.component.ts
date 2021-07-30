import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticuloCreateDto } from 'src/app/models/articulo/articulo-create-dto';
import { ClientesListDto } from 'src/app/models/clientes/clientes-create-list-dto';
import { VentasCreateListDto } from 'src/app/models/ventas/ventas-create-list-dto';
import { VentasDetailDto } from 'src/app/models/ventas/ventas-detail-dto';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { BuscarComponent } from '../../shared/buscar/buscar.component';

@Component({
  selector: 'app-ventas-create',
  templateUrl: './ventas-create.component.html',
  styleUrls: ['./ventas-create.component.css']
})
export class VentasCreateComponent implements OnInit {


  displayedColumns: string[] = ["Acciones","Producto", "Cantidad", "Precio", "Descuento", "Total"];
  Object: VentasCreateListDto = new VentasCreateListDto();
  clientes: ClientesListDto[] = [];
  articulos: ArticuloCreateDto[] = [];

  constructor(public dialog: MatDialog,
    private clienteService: ClientesService,
    private articuloService: ArticuloService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  guardarCambios(frm) {

  }

  openCliente() {
    if (this.clientes.length < 1) {
      this.clienteService.obtenerActive().subscribe((result: any) => {
        this.clientes = result;
      }, err => console.error(err));
    }
    else {
      this.openDialog(this.clientes).subscribe((cliente: any) => {
        this.Object.customerID = cliente.id;
        this.Object.customer.name = cliente.name;
      }, err => console.error(err));
    }
  }

  openArticulo() {

    if (this.articulos.length < 1) {
      this.articuloService.obtenerActive().subscribe((result: any) => {
        this.articulos = result;

        this.openDialog(this.articulos).subscribe((articulo: any) => {
          var newDetail: VentasDetailDto = new VentasDetailDto();

          newDetail.itemID = articulo.id;
          newDetail.item = articulo;
          newDetail.price = articulo.salePrice;
          newDetail.quantity = 1;
          newDetail.discount = 0;
          newDetail.total = articulo.salePrice;

          this.Object.invoiceDetails.push(newDetail);
          this.Object.invoiceDetails = [...this.Object.invoiceDetails];

        }, err => console.error(err));

      }, err => console.error(err));
    }
    else {
      this.openDialog(this.articulos).subscribe((articulo: any) => {
        var newDetail: VentasDetailDto = new VentasDetailDto();

        newDetail.itemID = articulo.id;
        newDetail.item = articulo;
        newDetail.price = articulo.salePrice;
        newDetail.quantity = 1;
        newDetail.discount = 0;
        newDetail.total = articulo.salePrice;

        this.Object.invoiceDetails.push(newDetail);
        this.Object.invoiceDetails = [...this.Object.invoiceDetails];

      }, err => console.error(err));
    }

    this.calcular();
  }

  update(element) {
    this.Object.invoiceDetails = [...this.Object.invoiceDetails.filter(f=> f.itemID !== element.itemID)];
    element.total = (element.quantity*element.price)-element.discount;
    this.calcular();
  }

  change(element) {
    element.total = (element.quantity  * element.price ) - element.discount ;
    console.log(element);
    
    this.calcular();
  }

  calcular() {
    this.Object.total = this.Object.invoiceDetails.reduce((a,b)=> a + parseInt(b.total.toString()),0);
    this.Object.discount = this.Object.invoiceDetails.reduce((a,b)=> a + parseInt(b.discount.toString()),0);
  }

  openDialog(data): any {
    const dialogRef = this.dialog.open(BuscarComponent, {
      width: '35%',
      data: data
    });

    return dialogRef.afterClosed();
  }

}
