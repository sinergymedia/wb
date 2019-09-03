import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BaseDealCUDModel } from '../../../../core/models/firebase.models';
import { FirebaseService } from '../../../../core/services/firebase.service';

@Component({
  selector: 'app-deal-update',
  templateUrl: './deal-update.modal.html',
  styleUrls: ['./deal-update.modal.scss'],
})
export class DealUpdateModal implements OnInit {

  // "location" is passed in firebase-details.page
  @Input() deal: BaseDealCUDModel;

  updateDealForm: FormGroup;

  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    public router: Router,
    private dealService: FirebaseService,
  ) { }

  ngOnInit() {
    this.updateDealForm = new FormGroup({
      title: new FormControl(this.deal.title, Validators.required),
      description: new FormControl(this.deal.description, Validators.required),
      category: new FormControl(this.deal.icon, Validators.required),
      maxVal: new FormControl(this.deal.maxVal, Validators.required),
      monthlyUses: new FormControl(this.deal.monthlyUses, Validators.required),
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }
  // async deleteDeal() {
  //   const alert = await this.alertController.create({
  //     header: 'Confirm',
  //     message: 'Do you want to delete ' + this.deal.title + '?',
  //     buttons: [
  //       {
  //         text: 'No',
  //         role: 'cancel',
  //         handler: () => {}
  //       },
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.firebaseService.deleteDeal(this.deal.id)
  //           .then(
  //             () => {
  //               this.dismissModal();
  //             },
  //             err => console.log(err)
  //           );
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  updateDeal() {
    this.deal.title = this.updateDealForm.value.title;
    this.deal.description = this.updateDealForm.value.description;
    this.deal.maxVal = this.updateDealForm.value.maxVal;
    this.deal.monthlyUses = this.updateDealForm.value.monthlyUses;
    this.deal.icon = this.updateDealForm.value.category;


    this.dealService.updateDeal(this.deal)
      .then(
        () => this.modalController.dismiss(),
        err => console.log(err)
      );
  }
  async deleteDeal() {
    await this.dealService.deleteDeal(this.deal.dealId);
    this.dismissModal();

  }
}
