import { Component, OnInit, HostBinding } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ImageModel } from '../../../../core/models/firebase.models';
import { ShellModel } from '../../../../core/shell/data-store';
import { FirebaseService } from '../../../../core/services/firebase.service';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.modal.html',
  styleUrls: [
    './styles/select-image.modal.scss',
    './styles/select-image.shell.scss'
  ]
})
export class SelectLocationImageModal implements OnInit {
  // Use Typescript intersection types to enable docorating the Array of firebase models with a shell model
  // (ref: https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types)
  images: Array<ImageModel> & ShellModel;

  @HostBinding('class.is-shell') get isShell() {
    return (this.images && this.images.isShell) ? true : false;
  }

  constructor(
    private modalController: ModalController,
    public imageService: FirebaseService  ) { }

  ngOnInit() {
    const dataSource = this.imageService.GetImageDataSource('location', 'coverPhotos');
    const dataStore = this.imageService.getImageStore(dataSource);

    dataStore.state.subscribe(
      (state) => {
        this.images = state;
      },
      (error) => {}
    );
  }

  dismissModal(avatar?: ImageModel) {
    this.modalController.dismiss(avatar);
  }
}
