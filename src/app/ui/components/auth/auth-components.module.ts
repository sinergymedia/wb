import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { GoogleLoginComponent } from './google-login/google-login';
import { FacebookLoginComponent } from './facebook-login/facebook-login';

@NgModule({
	declarations: [GoogleLoginComponent, FacebookLoginComponent],
	imports: [
		CommonModule,
		IonicModule
	],
	exports: [GoogleLoginComponent, FacebookLoginComponent]
})
export class AuthComponentsModule { }
