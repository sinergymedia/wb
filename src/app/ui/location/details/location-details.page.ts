import { Location } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ModalController, Platform } from '@ionic/angular';
import * as moment from 'moment';
import 'rxjs/add/operator/map';
import { CombinedLocationModel, CombinedUserModel, ActiveDealModel, RedeemedDealModel } from '../../../core/models/firebase.models';
import { FirestoreService } from '../../../core/services/firestore.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { DataStore } from '../../../core/shell/data-store';
import { DealRedeemModal } from '../../modals/deal/redeem/deal-redeem.modal';
// import { LocationReviewModal } from '../../modals/location-review/location-review.modal';
import { LocationUpdateModal } from '../../modals/location/update/location-update.modal';
import { UserSignupModal } from '../../modals/user/signup/user-signup.modal';
import { map, flatMap, switchMap, filter, take, publish } from 'rxjs/operators';
import { of, Observable, forkJoin } from 'rxjs';
export interface Redeemed {
  id: string[];
}
export interface Hours {
  day: string;
  from: string;
  to: string;
}

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.page.html',
  styleUrls: [
    './styles/location-details.page.scss',
    './styles/location-details.shell.scss'
  ],
})
export class LocationDetailsPage implements OnInit {
  location: CombinedLocationModel;
  user: CombinedUserModel;
  userData: Observable<CombinedUserModel>;
  activeDeals: Observable<Array<ActiveDealModel>>;
  mappedActiveDeals: ActiveDealModel[];
  availableDeals: ActiveDealModel[];
  redeemedDeals: ActiveDealModel[];
  segmentValue = 'deals';
  admin = false;
  defaultCoverPhoto =
    'https://firebasestorage.googleapis.com/v0/b/barbogos.appspot.com/o/images%2Flocation%2Fdetails-bg.png?alt=media&token=140dc5c7-4818-4327-bcd0-2bf3f4631a0b';
  year;
  month;
  lastDay;
  weekday;
  reviews: number;
  schedule: any = [];
  filteredRedeemed: RedeemedDealModel[];
  redeemed: any = [];
  redeemed$: Observable<{}>;
  available: any = [];
  chk: boolean;
  combinedDataStore: any;

  @HostBinding('class.is-shell') get isShell() {
    // return ((this.location && this.location.isShell) || (this.relatedLocations && this.relatedLocations.isShell)) || (this.user && this.user.isShell) ? true : false;
    return (
      (this.location && this.location.isShell) || (this.user && this.user.isShell)) ? true : false;
  }

  constructor(
    public modalController: ModalController,
    public router: Router,
    private route: ActivatedRoute,
    private callNumber: CallNumber,
    private browserTab: BrowserTab,
    private platform: Platform,
    private _location: Location,
    private afs: AngularFirestore,
    private db: FirestoreService,
    private locationService: FirebaseService,
    private storage: LocalStorageService

    // private afa: AngularFireAuth
  ) {
    this.month = moment().format('MMMM');
    this.year = moment().format('YY');
    this.lastDay = moment().endOf('month').format('YYYY-MM-DD hh:mm');
    this.weekday = moment().weekday();
    // this.getStatus()
  }

  ngOnInit() {
    this.getBaseData();

  }

  async getBaseData() {
    await this.route.data.subscribe(async (resolvedRouteData) => {
      const resolvedDataStores = resolvedRouteData['data'];
      const locationDataStore: DataStore<CombinedLocationModel> = resolvedDataStores.location;
      const userDataStore: DataStore<CombinedUserModel> = resolvedDataStores.user;
      const dealDataStore: DataStore<Array<ActiveDealModel>> = resolvedDataStores.deals;

      this.userData = userDataStore.state;
      this.activeDeals = dealDataStore.state;
      let filtered = [];
      // this.combinedDataStore.pipe(
      //   forkJoin({
      //     user: this.userData,
      //     location: this.activeDeals
      //   }).map(data => {
      //   data.user.rIds.forEach(id =>{

      //   })
      // })
      // )
      userDataStore.state.subscribe(
        (state) => {
          this.user = state;
          this.filteredRedeemed = [].concat.apply([], this.user.rIds).filter(deal => !deal.isShell);
          filtered = this.filteredRedeemed;
          console.log('redeem id array', this.filteredRedeemed);

          forkJoin({
            user:this.filteredRedeemed,
            deals: dealDataStore.state
          }).pipe(map(data => {
            for (let active of data.deals) {
              if ((data.user.redeemId === active.id)) {
                this.redeemed.push(active);
                console.log('this.redeemed:', this.redeemed);
                return this.redeemed;
              } else {
                this.available.push(active);
                console.log('this.available:', this.available);

                return this.available;

              }
    
            }
    
          }));
    
        });

      locationDataStore.state.subscribe(
        (state) => {
          if (state.reviews && state.reviews.length > 0) {
            this.reviews = state.reviews.length;
          }
          if (state.activeDeals) {
            state.activeDeals.forEach(deal => {
              console.log('filtered redeemed length', filtered);

              if (filtered.length >= 1) {
                const query = filtered.filter(redeemedDealIds => redeemedDealIds.redeemId === deal.id);
                console.log('query', query);

                if (query.length !== 0) {
                  console.log('redeemed match found', deal.id);

                  return [deal.redeemed = true];

                } else if (query.length > 0) {
                  console.log('redeemed match not found');

                  return [deal.redeemed = false];

                } else {
                  console.log('no redeemed deals for this location');
                }
              }
            });

            if (state.opening_hours) {
              state.opening_hours.forEach(s => {
                const day = s.split(' ')[0];
                const to = s.split(' ')[4] + s.split(' ')[5];
                const from = s.split(' ')[1] + s.split(' ')[2];
                const weekday = { day, from, to };
                this.schedule.push(weekday);

              });


            }
            // TODO: Highlight current day of the week
            this.schedule.forEach((item, i) => {
              if (i = this.weekday) {
              }
            });
            this.location = state;

          }

        });
    });
  }

  async openLocationUpdateModal() {
    const modal = await this.modalController.create({
      component: LocationUpdateModal,
      componentProps: {
        'location': this.location,
      }
    });
    await modal.present();

  }
  async openDealRedeemModal(item) {
    const modal = await this.modalController.create({
      component: DealRedeemModal,
      componentProps: {
        'location': this.location,
        'user': this.user,
        'deal': item,
      }
    });
    await modal.present();
  }

  async onCall() {
    try {
      await this.callNumber.callNumber(this.location.formatted_phone_number, true);
    } catch (err) {
      console.warn(err);
    }
  }

  openUrl() {
    if (!this.location.website && this.location.website !== 'no website information') { return; }
    if (this.platform.is('cordova')) {
      this.browserTab.openUrl(this.location.website);
    }
  }

  async signUp() {
    const modal = await this.modalController.create({
      component: UserSignupModal,
      componentProps: {
        'user': this.user,
      }
    });
    await modal.present();
  }

  goBack() {
    this._location.back();
  }

  segmentChanged(ev): void {
    this.segmentValue = ev.detail.value;
  }
  // async onRate() {
  //   const modal = await this.modalController.create({
  //     component: LocationReviewModal,
  //     componentProps: {
  //       'location': this.location,
  //     }
  //   });

  //   await modal.present();

  // }

}
