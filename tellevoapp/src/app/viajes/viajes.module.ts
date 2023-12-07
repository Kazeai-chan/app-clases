import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajesPageRoutingModule } from './viajes-routing.module';

import { ViajesPage } from './viajes.page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ListadoComponent } from '../listado/listado.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Mapa2PageModule } from '../mapa2/mapa2.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ViajesPageRoutingModule,
    ListadoComponent,
    Mapa2PageModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ViajesPage]
})
export class ViajesPageModule {}
