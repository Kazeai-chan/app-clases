import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecContPage } from './rec-cont.page';

const routes: Routes = [
  {
    path: '',
    component: RecContPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecContPageRoutingModule {}
