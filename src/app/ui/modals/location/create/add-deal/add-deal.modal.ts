import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BaseDealCUDModel } from '../../../../../core/models/firebase.models';
import { FirebaseService } from '../../../../../core/services/firebase.service';
import { FirestoreService } from '../../../../../core/services/firestore.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { DealCreateModal } from '../../../deal/create/deal-create.modal';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.modal.html',
  styleUrls: ['./add-deal.modal.scss'],
})
export class AddDealModal implements OnInit {
  @Input() location: string;
  @Input() id: string;
  redeemId: string;
  deals: Observable<BaseDealCUDModel[]>;
  selectedDeals = [];
  addDealForm: FormGroup;
  checked = [];
  data: Array<any>;
  ischecked: boolean;
  updateDealsForm: FormGroup;
  constructor(
    private modalController: ModalController,
    private db: FirestoreService,
    public toastCtrl: ToastController,
    private _fb: FormBuilder,
    public toast: ToastService,
    private locationService: FirebaseService

  ) { }
  ngOnInit() {
    this.deals = this.db.colWithIds$<BaseDealCUDModel>('deals', ref =>
      ref.orderBy('priority', 'asc'))
    this.addDealForm = this._fb.group({
      deals: new FormControl(!this.selectedDeals),
    });

  }


  async selectDeal(deal) {
    const locRef = this.db.doc('locations/' + this.id).ref;

    deal.checked = !deal.checked;

    if (deal.checked === true) {
      this.ischecked = true;
      const redeemId = await this.makeid(16);
      this.redeemId = redeemId;
      const dealDetails = {
        id: deal.id,
        icon: deal.categoryIcon,
        title: deal.title,
        redeemId: this.redeemId,
        description: deal.description,
        maxVal: deal.maxVal,
        monthlyUses: deal.monthlyUses,
        location: locRef,
        locationTitle: this.location,
        dealDescription: deal.description,
      };
      this.db.upsert('activeDeals/' + this.redeemId, dealDetails);

    } else {
      this.db.delete('activeDeals/' + this.redeemId);
    }
  }
  deleteDeal(id: string) {
    this.locationService.deleteLocationDeal(id);
  }
  makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  async openCreateDealModal() {
    const modal = await this.modalController.create({
      component: DealCreateModal,
    });
    await modal.present();
  }
  async onComplete() {
    this.modalController.dismiss();
  }
}
