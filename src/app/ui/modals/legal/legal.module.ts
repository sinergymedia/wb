import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// TODO: move to a shared module instead
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';
import { LegalPage } from './legal.page';
import { MatCardModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: LegalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MatCardModule

  ],
  declarations: [LegalPage],
  exports: []
})
export class LegalPageModule {}
