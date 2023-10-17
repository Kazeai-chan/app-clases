import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiculosPageRoutingModule } from './vehiculos-routing.module';

import { VehiculosPage } from './vehiculos.page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    VehiculosPageRoutingModule,
    MatFormFieldModule,
  ],
  declarations: [VehiculosPage]
})
export class VehiculosPageModule {}
