import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShellModule } from '../../core/shell/shell.module';

import { CheckboxWrapperComponent } from './checkbox-wrapper/checkbox-wrapper.component';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { CounterInputComponent } from './counter-input/counter-input.component';
import { RatingInputComponent } from './rating-input/rating-input.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { PaypalComponent } from './paypal/paypal.component';
import { BackgroundImageComponent } from './background-image/background-image.component';
import { MultiFileUploadComponent } from './multi-file-upload/multi-file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShellModule,
    FileUploadModule,

    IonicModule.forRoot()
  ],
  declarations: [
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    CountdownTimerComponent,
    CounterInputComponent,
    RatingInputComponent,
    GoogleMapComponent,
    NotificationMessageComponent,
    PaypalComponent,
    BackgroundImageComponent,
    MultiFileUploadComponent

  ],
  exports: [
    ShellModule,
    FileUploadModule,
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    CountdownTimerComponent,
    CounterInputComponent,
    RatingInputComponent,
    GoogleMapComponent,
    NotificationMessageComponent,
    BackgroundImageComponent,
    MultiFileUploadComponent
  ]
})
export class ComponentsModule {}
