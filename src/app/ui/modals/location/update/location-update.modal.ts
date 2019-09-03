import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';
import { Observable } from 'rxjs';
import { ActiveDealModel, CombinedLocationModel } from '../../../../core/models/firebase.models';
import { FirestoreService } from '../../../../core/services/firestore.service';
import { FirebaseService } from '../../../../core/services/firebase.service';
import { SelectLocationImageModal } from '../select-image/select-image.modal';
const geo = geofirex.init(firebase);
export interface DealId {
  id: string;
}

@Component({
  selector: 'app-location-update',
  templateUrl: './location-update.modal.html',
  styleUrls: ['./location-update.modal.scss'],
})
export class LocationUpdateModal implements OnInit, OnChanges {

  // "location" is passed in firebase-details.page
  @Input() location: CombinedLocationModel;
  updateLocationForm: FormGroup;
  selectedImage: string;
  activeDeals: Observable<ActiveDealModel[]>;
  selectedDeals: any = [];

  deals: Observable<ActiveDealModel[]>;
  redeemId: string;
  ischecked = false;

  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    public router: Router,
    private locationService: FirebaseService,
    private db: FirestoreService,
    private afs: AngularFirestore
  ) {
  }
  async ngOnInit() {
    const locRef = this.db.doc('locations/' + this.location.id).ref;



    this.activeDeals = this.db.colWithIds$<ActiveDealModel>('activeDeals', ref =>
      ref.where('location', '==', locRef));

    this.deals = this.db.colWithIds$<ActiveDealModel>('deals', ref =>
      ref.orderBy('priority', 'asc'));


    this.selectedImage =
      'https://firebasestorage.googleapis.com/v0/b/barbogos.appspot.com/o/images%2Flocation%2Fdetails-bg.png?alt=media&token=140dc5c7-4818-4327-bcd0-2bf3f4631a0b';
    this.updateLocationForm = new FormGroup({
      name: new FormControl(this.location.name, Validators.required),
      address: new FormControl(this.location.formatted_address, Validators.required),
      phone: new FormControl(this.location.formatted_phone_number, Validators.required),
      website: new FormControl(this.location.website, Validators.required),
      status: new FormControl(this.location.status, Validators.required),
      deals: new FormControl(!this.selectedDeals),

    });

  }
  ngOnChanges() {

  }

  dismissModal() {
    this.modalController.dismiss();
  }
  changeLangValue(value): string {
    switch (true) {
      case (value <= 3):
        return 'Novice';
      case (value > 3 && value <= 6):
        return 'Competent';
      case (value > 6):
        return 'Expert';
    }
  }


  updateLocation() {
    this.location.coverPhoto = this.selectedImage;
    this.location.name = this.updateLocationForm.value.name;
    this.location.website = this.updateLocationForm.value.website;
    this.location.formatted_phone_number = this.updateLocationForm.value.phone;
    this.location.formatted_address = this.updateLocationForm.value.address;
    this.location.status = this.updateLocationForm.value.status;

    // get the ids of the selected deals

    const { ...locationData } = this.location;

    this.locationService.updateLocation(locationData)
      .then(
        () => this.modalController.dismiss(),
        err => console.log(err)
      );
  }
  async selectDeal(deal) {
    deal.checked = !deal.checked;
    const redeemId = this.makeid(16);

    if (deal.checked === true) {
      this.ischecked = true;
      const locationRef = this.db.doc('locations/' + this.location.id).ref;
      const dealDetails = {
        baseId: deal.id,
        icon: deal.categoryIcon,
        title: deal.title,
        description: deal.description,
        maxVal: deal.maxVal,
        monthlyUses: deal.monthlyUses,
        location: locationRef,

      };

      this.db.add('activeDeals/', dealDetails);

    } else {
      this.db.delete('activeDeals/' + deal.id);

    }
  }
  deleteDeal(id: string) {
    this.db.delete('activeDeals/' + id);
  }

  async changeCoverImage() {
    const modal = await this.modalController.create({
      component: SelectLocationImageModal
    });

    modal.onDidDismiss().then(image => {
      if (image.data != null) {
        this.selectedImage = image.data.link;
      }
    });
    await modal.present();
  }
  async makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
