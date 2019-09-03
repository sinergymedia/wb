import { AgmCoreModule } from '@agm/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StarRatingModule } from 'angular-star-rating';
import { NgxPayPalModule } from 'ngx-paypal';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { LocalStorageService } from './core/services/local-storage.service';
import { FirebaseService } from './core/services/firebase.service';
import { NetworkService } from './core/services/network.service';
import { NotifyService } from './core/services/notify.service';
import { AuthComponentsModule } from './ui/components/auth/auth-components.module';
import { ComponentsModule } from './ui/components/components.module';
import { UserSignupModal } from './ui/modals/user/signup/user-signup.modal';
import { DataService } from './core/services/data.service';
import { StoreModule } from '@ngrx/store';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent, UserSignupModal, NetworkService
  ],
  imports: [
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    }),
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPayPalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),

    StarRatingModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ComponentsModule,
    AuthComponentsModule
  ],
  providers: [
    Facebook,
    GooglePlus,
    DatePicker,
    Geolocation,
    AuthService,
    NotifyService,
    AngularFirestore,
    AngularFireAuth,
    NetworkService,
    NativeStorage,
    LocalStorageService,
    FirebaseService,
    DataService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
