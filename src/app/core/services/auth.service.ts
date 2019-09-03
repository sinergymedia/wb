import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { GettingStartedModal } from '../../ui/modals/user/getting-started/getting-started.modal';
import { UserModel } from '../models/firebase.models';
import { DataService } from './data.service';
import { LoadingService } from './loading.service';
import { NotifyService } from './notify.service';


@Injectable()

export class AuthService {
  userData: UserModel = new UserModel();
  user: Observable<firebase.User>;
  userId: string;
  newUser: boolean;
  constructor(
    public modalController: ModalController,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService,
    private load: LoadingService,
    private data: DataService,
  ) {
  }

  checkUser() {
    this.afAuth.authState.subscribe(user => {
      this.userId = user.uid;
    });
  }
  loggedInRedirect() {
    if (this.userId) {
     return this.router.navigate['app/location/listing'];
    }
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome to Wiscobogos!!!', 'success');
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome back!', 'success');
        return;
      })
      .catch(error => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }

  async signOut() {
    this.data.remove('user');
    this.afAuth.auth.signOut();
  }
  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }


  public newUserCheck(path: string) {
    this.notify.update('Welcome to Wiscobogos!!!', 'success');
    return this.afs.doc(path).valueChanges().pipe(first()).toPromise();
  }

  async openGettingStartedModal(item) {
    const modal = await this.modalController.create({
      component: GettingStartedModal,
      componentProps: {
        'user': this.user,
      }
    });

    await modal.present();

  }

}
