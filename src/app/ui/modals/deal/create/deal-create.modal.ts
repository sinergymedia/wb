import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LocationModel } from '../../../../core/models/firebase.models';
import { BaseDealCUDModel } from '../../../../core/models/firebase.models';
import { FirebaseService } from '../../../../core/services/firebase.service';
import { FirestoreService } from '../../../../core/services/firestore.service';
import { counterRangeValidator } from '../../../components/counter-input/counter-input.component';
import { SelectLocationImageModal } from '../../location/select-image/select-image.modal';

@Component({
  selector: 'app-deal-create',
  templateUrl: './deal-create.modal.html',
  styleUrls: ['./deal-create.modal.scss'],
})
export class DealCreateModal implements OnInit {
  @Input() location: LocationModel;
  newDealForm: FormGroup;
  dealData: BaseDealCUDModel = new BaseDealCUDModel;
  checked = [];
  data: Array<any>;
  deals: Observable<BaseDealCUDModel[]>;
  categories;
  validations = {
    'priority': [
      { type: 'rangeError', message: 'Monthly uses must be between: ' }
    ],
    'monthlyUses': [
      { type: 'rangeError', message: 'Priority must be between: ' }
    ],
  };
  constructor(
    private modalController: ModalController,
    public dealService: FirebaseService,
    private db: FirestoreService,
    public toastCtrl: ToastController,


  ) {
    this.categories = [
      { name: 'Food', icon: 'https://firebasestorage.googleapis.com/v0/b/barbogos.appspot.com/o/icons%2Fcutlery.png?alt=media&token=e073a3f4-99b6-429b-b8dc-a7c51754f19d' },
      { name: 'Drinks', icon: 'https://firebasestorage.googleapis.com/v0/b/barbogos.appspot.com/o/icons%2Fbeer.png?alt=media&token=8ed0b48c-7226-4aa6-ae43-bffd27c0044a' },
      { name: 'Food & Drinks', icon: 'https://firebasestorage.googleapis.com/v0/b/barbogos.appspot.com/o/icons%2Fmeals.png?alt=media&token=fa593624-fc95-4331-b6c4-868aecf15466' },
      { name: 'Service', icon: 'https://firebasestorage.googleapis.com/v0/b/barbogos.appspot.com/o/icons%2Flimousine.png?alt=media&token=9f7b7af7-847f-40c1-8067-8a3257921c7c' },
      { name: 'Other', icon: 'https://firebasestorage.googleapis.com/v0/b/barbogos.appspot.com/o/icons%2Fquestion.png?alt=media&token=c0bc5a23-5475-4a75-82ba-31ec6100d5e7' },
    ];

  }

  ngOnInit() {
    // default image
    this.deals = this.db.colWithIds$<BaseDealCUDModel>('deals');

    this.newDealForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required),
      'priority': new FormControl(3, counterRangeValidator(1, 5)),
      'monthlyUses': new FormControl(1, counterRangeValidator(1, 5)),
      'maxVal': new FormControl(7.50, counterRangeValidator(1, 250)),
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  createDeal() {
    const data = {
      'title': this.newDealForm.value.title,
      'description': this.newDealForm.value.description,
      'categoryIcon': this.newDealForm.value.category.icon,
      'categoryName': this.newDealForm.value.category.name,
      'maxVal': this.newDealForm.value.maxVal,
      'monthlyUses': this.newDealForm.value.monthlyUses,
      'priority': this.newDealForm.value.priority

    };
    this.db.add('deals/', data)
      .then(() => {
        this.dismissModal();
      });
  }


  async changePhoto() {
    const modal = await this.modalController.create({
      component: SelectLocationImageModal
    });


  }
}

