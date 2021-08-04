import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasListDto } from 'src/app/models/compras/compras-list-dto';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-compras-view',
  templateUrl: './compras-view.component.html',
  styleUrls: ['./compras-view.component.css']
})
export class ComprasViewComponent implements OnInit {

  displayedColumns: string[] = [
    'Producto',
    'Cantidad',
    'Precio',
    'Descuento',
    'Total',
  ];
  Object: ComprasListDto = new ComprasListDto();

  constructor(
    private comprasService: ComprasService,
    private activateRoute:ActivatedRoute,
    private route:Router
  ) {
    this.activateRoute.params.subscribe(param => {
      this.comprasService.obtenerById(param.id).subscribe(compra => {
        if (!compra) {
          route.navigate(["/compras"])
        }
        
        this.Object = compra;
      }, err => {
        this.route.navigate(["/compras"])

      });
    });
  }

  ngOnInit(): void {
  }

}
