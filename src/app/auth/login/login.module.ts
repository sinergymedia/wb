import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../ui/components/components.module';
import { LoginPage } from './login.page';
import { LoginPageResolver } from './login.page.resolver';
import { NotifyService } from '../../core/services/notify.service';
import { FirestoreComponentsModule } from '../../ui/components/-groups/firestore-components.module';
import { GettingStartedModal } from '../../ui/modals/user/getting-started/getting-started.modal';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { AuthComponentsModule } from '../../ui/components/auth/auth-components.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    resolve: {
      data: LoginPageResolver
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
    FirestoreComponentsModule,
    Ionic4DatepickerModule,
    AuthComponentsModule,


  ],
  declarations: [LoginPage, GettingStartedModal],
  entryComponents: [ GettingStartedModal ],
  exports: [],
  providers: [
    LoginPageResolver,
    NotifyService,
  ]
})
export class LoginPageModule { }
