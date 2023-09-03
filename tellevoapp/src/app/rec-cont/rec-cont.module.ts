import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecContPageRoutingModule } from './rec-cont-routing.module';

import { RecContPage } from './rec-cont.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecContPageRoutingModule
  ],
  declarations: [RecContPage]
})
export class RecContPageModule {}
