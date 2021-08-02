import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './Components/menu/menu/menu.component';
import { DashboardComponent } from './Components/dashboard/dashboard/dashboard.component';
import { UnidadListComponent } from './Components/unidad/unidad-list/unidad-list.component';
import { ProductosListComponent } from './Components/productos/productos-list/productos-list.component';
import { ClientesListaComponent } from './Components/clientes/clientes-lista/clientes-lista.component';
import { SuplidoresListaComponent } from './Components/Suplidores/suplidores-lista/suplidores-lista.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CrearUnidadComponent } from './Components/unidad/crear-unidad/crear-unidad.component';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CrearClientesComponent } from './Components/clientes/crear-clientes/crear-clientes.component';
import { CrearSuplidorComponent } from './Components/Suplidores/crear-suplidor/crear-suplidor.component';
import { CrearproductosComponent } from './Components/productos/crearproductos/crearproductos.component';
import { VentasListComponent } from './Components/ventas/ventas-list/ventas-list.component';
import { ComprasListComponent } from './Components/compras/compras-list/compras-list.component';
import { VentasCreateComponent } from './Components/ventas/ventas-create/ventas-create.component';
import { BuscarComponent } from './Components/shared/buscar/buscar.component';
import { ComprasCreateComponent } from './Components/compras/compras-create/compras-create.component';
import { ProduccionListComponent } from './Components/produccion/produccion-list/produccion-list.component';
import { ProduccionCrearComponent } from './Components/produccion/produccion-crear/produccion-crear.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    UnidadListComponent,
    ProductosListComponent,
    ClientesListaComponent,
    SuplidoresListaComponent,
    CrearUnidadComponent,
    CrearClientesComponent,
    CrearSuplidorComponent,
    CrearproductosComponent,
    VentasListComponent,
    ComprasListComponent,
    VentasCreateComponent,
    BuscarComponent,
    ComprasCreateComponent,
    ProduccionListComponent,
    ProduccionCrearComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
