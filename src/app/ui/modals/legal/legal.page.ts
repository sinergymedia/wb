import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-legal-page',
  templateUrl: 'legal.page.html',
  styleUrls: ['./legal.page.scss']
})

export class LegalPage {
  segmentValue = 'tos';
  constructor(private modalController: ModalController) { }

  dismiss(): void {
    this.modalController.dismiss();
  }
  segmentChanged(ev): void {
    this.segmentValue = ev.detail.value;
  }

}
