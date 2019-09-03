import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserProfilePage } from './user-profile.page';
import { UserProfileResolver } from './user-profile.resolver';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserUpdateModal } from '../../modals/user/update/user-update.modal';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { SelectUserImageModal } from '../../modals/user/select-image/select-image.modal';
import { AngularFireStorageModule } from '@angular/fire/storage';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePage,
    resolve: {
      data: UserProfileResolver
    }
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ComponentsModule,
    AngularFireStorageModule,
    RouterModule.forChild(routes),
    Ionic4DatepickerModule,
  ],
  declarations: [
    UserProfilePage, UserUpdateModal, SelectUserImageModal
  ],
  entryComponents: [
    UserUpdateModal, SelectUserImageModal
  ],
  providers: [
    UserProfileResolver
  ]
})
export class UserProfilePageModule { }
