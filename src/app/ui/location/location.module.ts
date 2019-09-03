import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { IonicModule } from '@ionic/angular';
import { NgPipesModule } from 'angular-pipes';
import { StarRatingModule } from 'angular-star-rating';
import { NgxPayPalModule } from 'ngx-paypal';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    StarRatingModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    NgPipesModule,
    NgxPayPalModule,
  ],
  providers: [AuthService, CallNumber, BrowserTab, ToastService],
  entryComponents: [
  ],
  declarations: [
  ]
})
export class LocationModule { }
