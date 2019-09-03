import { formatDate } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ModalController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';
import { UserCUDModel, UserModel } from '../../../../core/models/firebase.models';
import { DataService } from '../../../../core/services/data.service';
import { FirebaseService } from '../../../../core/services/firebase.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { GettingStartedModal } from '../../../modals/user/getting-started/getting-started.modal';

@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {

  user: Observable<firebase.User>;
  newUserData: UserModel;
  userId: string;
  userData: UserCUDModel = new UserCUDModel();
  date;

  constructor(
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    private userService: FirebaseService,
    private afs: AngularFirestore,
    private modalController: ModalController,
    private router: Router,
    private ngZone: NgZone,
    private data: DataService,
    private load: LoadingService
  ) {
    this.date = moment();

    this.user = this.afAuth.authState;

  }
  async presentLoading(loading) {
    return await loading.present();
  }


  async googleLogin() {

    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      return this.webGoogleLogin().then(
        () => {

        }
      );
    }
  }

  async nativeGoogleLogin() {
    try {

      const gplusUser = await this.gplus.login({
        'webClientId': '860689199486-ap0gotqnbih1vtn6qfd1pl869o35g0md.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });
      this.userData = gplusUser;
      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );


    } catch (err) {
      console.log(err);
    }
  }
  // async webGoogleLogin() {
  //   const date = await formatDate(new Date(), 'MM-dd-yyyy', 'en');

  //   const loading = await this.loadingController.create({
  //     message: 'Hold tight partner...'
  //   });
  //   this.presentLoading(loading);

  //   try {
  //     const provider = new firebase.auth.GoogleAuthProvider();
  //     provider.addScope('profile');
  //     provider.addScope('email');
  //     return this.afAuth.auth.signInWithPopup(provider).then(
  //       (res) => {
  //         const id = res.user.uid.toString();
  //         const check = this.docExists('userProfile/' + id);

  //         if (!check) {
  //           this.userData.id = id;
  //           this.userData.avatar = res.user.photoURL.toString();
  //           this.userData.displayName = res.user.displayName;
  //           this.userData.email = res.user.email;
  //           this.userData.status = 'subscribed';
  //           this.userData.signupDate = date;
  //           this.userService.createUser(this.userData)
  //             .then(
  //               () => {
  //                 this.openGettingStartedModal(this.userData)
  //                   .then(
  //                     () => {
  //                       loading.dismiss()
  //                     }
  //                   )
  //               }
  //             )
  //         } else {
  //           this.storage.set('id', id)
  //           this.router.navigate(['./app/location/listing'])
  //             .then(
  //               () => {
  //                 loading.dismiss()
  //               }
  //             )
  //         }
  //       })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  async webGoogleLogin() {

    const date = formatDate(new Date(), 'MM-dd-yyyy', 'en');
    this.load.start('Hold tight partner...').then(
      () => {
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope('profile');
          provider.addScope('email');
          this.afAuth.auth.signInWithPopup(provider).then(
            (res) => {
              const id = res.user.uid.toString();
              const check = this.docExists('userProfile/' + id);
              if (!check) {
                this.userData.id = id;
                this.userData.avatar = res.user.photoURL.toString();
                this.userData.displayName = res.user.displayName;
                this.userData.email = res.user.email;
                this.userData.status = 'subscribed';
                this.userData.signupDate = date;
                this.newUser();
              } else {
                this.existingUser();
              }
            });
        } catch (err) {
          console.log(err);
        }
      });
    this.load.end();
  }
  newUser() {
    this.userService.createUser(this.userData);
    this.userService.setUserData(this.userId);
    this.openGettingStartedModal(this.userData);
    this.load.end();

  }
  existingUser() {
    this.load.end();
    this.ngZone.run(() => this.router.navigate(['app/location/listing']));

  }
  docExists(path: string) {
    return this.afs.doc(path).valueChanges().pipe(first()).toPromise();
  }
  async openGettingStartedModal(user: UserCUDModel) {

    const modal = await this.modalController.create({
      component: GettingStartedModal,
      componentProps: {
        'user': this.userData,
      },
      showBackdrop: true,
      backdropDismiss: false,
    },
    );
    await modal.present();

  }

  signOut() {
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.gplus.logout();
    }
  }
}
