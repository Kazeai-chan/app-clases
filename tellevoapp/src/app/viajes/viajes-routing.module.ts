import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajesPage } from './viajes.page';
import { ListadoComponent } from '../listado/listado.component';
import { Mapa2Page } from '../mapa2/mapa2.page';

const routes: Routes = [
  {
    path: '',
    component: ViajesPage,
    children: [
      {
        path: 'listado', // child route path
        component: ListadoComponent, // child route component that the router renders
      },
      {
        path: 'mapa2', // Agrega esta ruta
        component: Mapa2Page,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajesPageRoutingModule {}
