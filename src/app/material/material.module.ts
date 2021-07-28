import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from "@angular/material/toolbar";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';

@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatTreeModule
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
