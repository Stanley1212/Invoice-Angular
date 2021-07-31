import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesListaComponent } from './Components/clientes/clientes-lista/clientes-lista.component';
import { ComprasCreateComponent } from './Components/compras/compras-create/compras-create.component';
import { ComprasListComponent } from './Components/compras/compras-list/compras-list.component';
import { DashboardComponent } from './Components/dashboard/dashboard/dashboard.component';
import { ProductosListComponent } from './Components/productos/productos-list/productos-list.component';
import { SuplidoresListaComponent } from './Components/Suplidores/suplidores-lista/suplidores-lista.component';
import { UnidadListComponent } from './Components/unidad/unidad-list/unidad-list.component';
import { VentasCreateComponent } from './Components/ventas/ventas-create/ventas-create.component';
import { VentasListComponent } from './Components/ventas/ventas-list/ventas-list.component';

const routes: Routes = [
  {path:"", component:DashboardComponent },
  {path:"unidades", component:UnidadListComponent },
  {path:"productos", component:ProductosListComponent },
  {path:"clientes", component:ClientesListaComponent },
  {path:"suplidores", component:SuplidoresListaComponent },
  {path:"ventas", component:VentasListComponent},
  {path:"ventas/crear", component:VentasCreateComponent},
  {path:"compras", component:ComprasListComponent },
  {path:"compras/crear", component:ComprasCreateComponent },
  {path:"**", component:DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
