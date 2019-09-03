import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = false;

  constructor(private loadingController: LoadingController) { }

  async present(loading) {
    return await loading.present();
  }
  async dismiss(loading) {
    await loading.dismiss();
  }

  async start(mes?: string, dur?: number) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: mes,
      duration: dur,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });

  }
  async end() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

}
