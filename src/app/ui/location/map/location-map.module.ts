import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { LocationMapPage } from './location-map.page';
import { LocationMapResolver } from './location-map.resolver';



const categoriesRoutes: Routes = [
  {
    path: '',
    component: LocationMapPage,

    resolve: {
      data: LocationMapResolver
    }
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(categoriesRoutes),
    ComponentsModule,
    AgmCoreModule,
    PipesModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule


  ],
  declarations: [LocationMapPage],
  providers: [LocationMapResolver]
})
export class LocationMapPageModule { }
