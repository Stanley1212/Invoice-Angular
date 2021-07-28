import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './Components/menu/menu/menu.component';
import { DashboardComponent } from './Components/dashboard/dashboard/dashboard.component';
import { UnidadListComponent } from './Components/unidad/list/unidad-list/unidad-list.component';
import { ProductosListComponent } from './Components/productos/productos-list/productos-list.component';
import { ClientesListaComponent } from './Components/clientes/clientes-lista/clientes-lista.component';
import { SuplidoresListaComponent } from './Components/Suplidores/suplidores-lista/suplidores-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    UnidadListComponent,
    ProductosListComponent,
    ClientesListaComponent,
    SuplidoresListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
