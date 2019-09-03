import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { firestore } from 'firebase/app';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal/';
import { CombinedUserModel } from '../../../../core/models/firebase.models';
@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.modal.html',
  styleUrls: ['./user-signup.modal.scss'],
})
export class UserSignupModal implements OnInit {
  public payPalConfig ?: IPayPalConfig;
  date: Date;
  timestamp;

  // "user" is passed in firebase-details.page
  @Input() user: CombinedUserModel;

  userSignupForm: FormGroup;
  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    private afs: AngularFirestore,
    public router: Router,
    public toast: ToastService

  ) {}

  ngOnInit(): void {
    this.initConfig();
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'ASA7k1wVXzuiOaTUHl2kmKemZhzPhgWLk_VYJcrkdSOkOshe8fisCkFduhDTB-xiDJgCp-e9ME7d81R1',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{

          amount: {

            currency_code: 'USD',
            value: '5',
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: '5'
              }
            }
          },
          items: [{
            name: 'Wiscobogos Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',

            unit_amount: {
              currency_code: 'USD',
              value: '5',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        size: 'small',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        // this.showCancel = true;

      },
      onError: err => {
        console.log('OnError', err);
       this.toast.showToast('There was an error processing your payment. Please try again. If the problem persists please contact support at support@wiscobogos.com.', 2000);

    }

  };
}
 showSuccess() {
    console.log('subscription successful, redirecting');

    this.signupUser().then(() => {
      this.toast.showToast('Subscription processed successfully! Enjoy your deals! ', 2000);
      this.dismissModal();
    });

  }
  dismissModal() {
    this.modalController.dismiss();
  }

  signupUser() {
    const userRef = this.afs.doc(`userProfile/` + this.user.id);
    const timestamp = firestore.FieldValue.serverTimestamp();
    return userRef.set({
       'status': 'subscribed',
        'freeDeemed': false,
        'subscribeDate': timestamp
      }, { merge: true });

  }

}
