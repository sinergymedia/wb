import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { FirestoreService } from '../../../../core/services/firestore.service';
import { LocationModel, ActiveDealModel, RedeemedDealModel, CombinedUserModel } from '../../../../core/models/firebase.models';
import { CombinedLocationModel } from '../../../../ui/location/location-details.model';
import { FirebaseService } from '../../../../core/services/firebase.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { of, Observable } from 'rxjs';

export class Stats {
  count: number;
}
@Component({
  selector: 'app-deal-redeem',
  templateUrl: './deal-redeem.modal.html',
  styleUrls: ['./deal-redeem.modal.scss'],
})
export class DealRedeemModal implements OnInit {
  @Input() location: CombinedLocationModel;
  @Input() user: CombinedUserModel;
  @Input() deal: ActiveDealModel;
  redeemModel: RedeemedDealModel;
  date;
  stats;
  shortDate;
  year;
  month;
  day;
  toasty: any;
  verified: boolean;
  finePrint =
    'Free drink or food is for you and can\'t be given to a friend. ' +
    'Limit 1 coupon per person, per day, and can\'t be used on doubles. ' +
    'BOGO deals based on regular price and not valid with other specials/discounts.';
  constructor(
    private modalController: ModalController,
    private db: FirestoreService,
    private route: Router,
    private afs: AngularFirestore,
    public toast: ToastController,
    private loading: LoadingService,
    private locationService: FirebaseService
  ) {
    this.stats = this.db.doc$('stats/totalSaved');
    this.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.day = moment().format('DD');
    this.month = moment().format('MM');
    this.year = moment().format('YY');
    this.shortDate = moment().format('MM/DD/YY, h:mm a');
  }
  ngOnInit() {
  }
  async redeemDeal() {
    const user = this.db.doc('userProfile/' + this.user.id).ref;
    const location = this.db.doc('locations/' + this.location.id).ref;
    const deal = this.db.doc('deals/' + this.deal.id).ref;
    const date = this.date;
    const dealData = {
      'dealTitle': this.deal.title,
      'locationName': this.location.name,
      'user': user,
      'deal': deal,
      'location': location,
      'redeemId': this.deal.id,
      'date': date,
      'month': this.month,
      'year': this.year

    };

    if (this.user.status === 'registered') {
      this.freeRedemption();
    }
    this.loading.start();
    return await this.db.add('redeemedDeals/', dealData).then((result) => {
      return  this.loading.end().then(async() => {
        console.log(result);
        if (result) {
          return await this.success().then(async() => {
            return await this.modalController.dismiss();
          });
        } else {
          return await this.error();
        }
      });
    });
  }
  // Sets user data to firestore on login
  dismissModal() {
    this.modalController.dismiss();
  }
  showToast(message: string) {
    this.toasty = this.toast.create({
      message: message,
      duration: 5000,
      showCloseButton: true,
      closeButtonText: 'Thanks!',
    }).then((toastData) => {
      toastData.present();
    });
  }

  async success() {
   return await this.showToast('Deal successfully redeemed! Enjoy your 🍔 🍹 🍺! ');


  }
   async error() {
    return await this.showToast('OOPS! something went wrong! Please check your internet connection or try again!');

  }
  freeRedemption() {
    const userRef = this.afs.doc(`userProfile/` + this.user.id);
    return userRef.set({ 'freeDeemed': true }, { merge: true }).then(() => {
      this.success();
    });
  }






}

