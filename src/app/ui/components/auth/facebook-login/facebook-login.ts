import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';

import { Facebook } from '@ionic-native/facebook/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import { NotifyService } from '../../../../core/services/notify.service';


@Component({
  selector: 'facebook-login',
  templateUrl: 'facebook-login.html'
})
export class FacebookLoginComponent {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, 
              private fb: Facebook,
              private platform: Platform,
              private notify: NotifyService,
              private loadingController: LoadingController,

              ) {

    this.user = this.afAuth.authState;

  }


  facebookLogin() {
    if (this.platform.is('cordova')) {
      this.nativeFacebookLogin();
    } else {
      this.webFacebookLogin();
    }
  }

  async nativeFacebookLogin() {
    try {

      const fbUser = await this.fb.login(['public_profile', 'email'])

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.FacebookAuthProvider.credential(fbUser.authResponse.userID)
      )


    } catch(err) {
      this.handleError(err)
    }
  }

  async webFacebookLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

    } catch(err) {
      this.handleError(err)
    }
  }
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
    this.endLoading();

  }
  async endLoading() {
    await this.loadingController.dismiss();

  }

  signOut() {
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.fb.logout();
    }
  }

}
