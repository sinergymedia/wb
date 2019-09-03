import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { IonicModule } from '@ionic/angular';
import { MapService } from '../../../core/services/map.service';
import { LocationListingPage } from './location-listing.page';
import { LocationListingResolver } from './location-listing.resolver';
import { MatIconModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LocationCreateModal } from '../../modals/location/create/location-create.modal';
import { AddDealModal } from '../../modals/location/create/add-deal/add-deal.modal';



const routes: Routes = [
  {
    path: '',
    component: LocationListingPage,
    resolve: {
      data: LocationListingResolver
    }
  }];

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    PipesModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    AngularFirestoreModule,

  ],
  declarations: [
    LocationListingPage,
    LocationCreateModal,
    AddDealModal
  ],
  providers: [
    MapService,
    Keyboard,
    LocationListingResolver,
  ],
  entryComponents: [LocationCreateModal,    AddDealModal
  ]
})
export class LocationListingPageModule { }
