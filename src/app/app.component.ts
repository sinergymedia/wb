import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './core/services/data.service';
import { FirebaseService } from './core/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
const { SplashScreen, StatusBar } = Plugins;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openClose', [state('open', style({ height: '200px', opacity: 1, backgroundColor: 'yellow' })),
    state('closed', style({ height: '100px', opacity: 0.5, backgroundColor: 'green' })),
    transition('open => closed', [animate('1s')]),
    transition('closed => open', [animate('0.5s')]) ]),
  ]
})
export class AppComponent implements OnInit {
  appPages = [];
  textDir = 'ltr';
  isLoaded = false;
  userId: string;
  constructor(
    public translate: TranslateService,
    private platform: Platform,
    private data: DataService,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService
  ) {
    this.initializeApp();

  }
  ngOnInit() {
    this.afAuth.authState.subscribe( user => {
      if (user) {
         this.userId = user.uid;
         this.data.create({ 'id': 'userId', 'value':  user.uid });
        }
    });
    this.isLoaded = false;
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.isLoaded = true;
      if (this.platform.is('cordova')) {
        SplashScreen.hide().catch(error => {
          console.error(error);
        });
        StatusBar.hide().catch(error => {
          console.error(error);
        });

      }
    });
  }
}

