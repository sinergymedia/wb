import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { ToastService } from '../../../core/services/toast.service';
import { ComponentsModule } from '../../components/components.module';
import { DealRedeemModal } from '../../modals/deal/redeem/deal-redeem.modal';
import { LocationDetailsPage } from './location-details.page';
import { LocationDetailsResolver } from './location-details.resolver';
import { LocationUpdateModal } from '../../modals/location/update/location-update.modal';
import { DealCreateModal } from '../../modals/deal/create/deal-create.modal';
import { DealUpdateModal } from '../../modals/deal/update/deal-update.modal';
import { SelectLocationImageModal } from '../../modals/location/select-image/select-image.modal';

const routes: Routes = [
  {
    path: '',
    component: LocationDetailsPage,
    resolve: {
      data: LocationDetailsResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PipesModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    AngularFirestoreModule,
  ],
  providers: [
    LocationDetailsResolver, BrowserTab, ToastService,  CallNumber
  ],
  declarations: [
    LocationDetailsPage, DealRedeemModal, LocationUpdateModal, DealCreateModal, DealUpdateModal, SelectLocationImageModal
  ],
  entryComponents: [
    DealRedeemModal, LocationUpdateModal, DealCreateModal, DealUpdateModal, SelectLocationImageModal
  ]
})
export class LocationDetailsPageModule { }
