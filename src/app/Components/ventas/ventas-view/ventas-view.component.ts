import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VentasCreateListDto } from 'src/app/models/ventas/ventas-create-list-dto';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas-view',
  templateUrl: './ventas-view.component.html',
  styleUrls: ['./ventas-view.component.css']
})
export class VentasViewComponent implements OnInit {

  displayedColumns: string[] = [
    'Producto',
    'Cantidad',
    'Precio',
    'Descuento',
    'Total',
  ];

  id:number;
  Object: VentasCreateListDto = new VentasCreateListDto();

  constructor(
    private ventaService: VentasService,
    private router:Router,
    private activeRoute:ActivatedRoute
  ) {

    this.activeRoute.params.subscribe(param => {
      if (!param.id) {
        return;
      }

      this.ventaService.obtenerById(param.id).subscribe(venta => {
        console.log(venta);
        
        this.Object=venta;
      },err => {
        this.router.navigate(["/ventas"])
      });

    });

  }

  typeChange(type:number) {
    this.Object.type = type;
  }

  ngOnInit(): void {}

}
