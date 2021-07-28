import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesListaComponent } from './Components/clientes/clientes-lista/clientes-lista.component';
import { DashboardComponent } from './Components/dashboard/dashboard/dashboard.component';
import { ProductosListComponent } from './Components/productos/productos-list/productos-list.component';
import { SuplidoresListaComponent } from './Components/Suplidores/suplidores-lista/suplidores-lista.component';
import { UnidadListComponent } from './Components/unidad/unidad-list/unidad-list.component';

const routes: Routes = [
  {path:"", component:DashboardComponent },
  {path:"unidades", component:UnidadListComponent },
  {path:"productos", component:ProductosListComponent },
  {path:"clientes", component:ClientesListaComponent },
  {path:"suplidores", component:SuplidoresListaComponent },
  {path:"**", component:DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
