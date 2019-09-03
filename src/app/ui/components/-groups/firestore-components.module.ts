import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule } from '@ionic/angular';
// import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { environment } from '../../../../environments/environment';
import { WebView } from '@ionic-native/ionic-webview/ngx';


// const firebaseUiAuthConfig: firebaseui.auth.Config = {
//   signInFlow: 'popup',

//   signInOptions: [
//     {
//       provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       customParameters: {
//         prompt: 'select_account'
//       }
//     },
//     {
//       provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//       scopes: [
//         'public_profile',
//         'email',
//         'user_likes',
//         'user_friends'
//       ],
//       customParameters: {
//         prompt: 'consent'
//       }
//     },
//     {
//       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       requireDisplayName: true,
//     }
//   ],
//   tosUrl: 'https://wiscobogos.com/tos',
//   privacyPolicyUrl: 'https://wiscobogos.com/privacy',
//   credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
// };
@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    AngularFireAuthModule,
    // AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    // FirebaseUIModule.forRoot(firebaseUiAuthConfig),


  ],
  declarations: [],
  exports: [],
  providers: [    
    WebView,
    { provide: FirestoreSettingsToken, useValue: {} }
    ],
  entryComponents: [],
})
export class FirestoreComponentsModule {}
