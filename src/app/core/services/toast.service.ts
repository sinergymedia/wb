import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',

})
export class ToastService {
  toast: any;

  constructor(public toastController: ToastController
  ) { }
  showToast(message: string, duration: number) {
    this.toast = this.toastController.create({
      message: message,
      duration: duration,
      showCloseButton: true,
      closeButtonText: 'Thanks!',
      cssClass: 'toast-success'
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  HideToast() {
    this.toast = this.toastController.dismiss();
  }
}
