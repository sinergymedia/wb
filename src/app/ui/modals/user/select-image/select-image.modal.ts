import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageModel } from '../../../../core/models/firebase.models';
import { ShellModel } from '../../../../core/shell/data-store';
import { FirebaseService } from '../../../../core/services/firebase.service';
import { MultiFileUploadComponent } from '../../../../ui/components/multi-file-upload/multi-file-upload.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.modal.html',
  styleUrls: [
    './styles/select-image.modal.scss',
    './styles/select-image.shell.scss'
  ]
})
export class SelectUserImageModal implements OnInit {
  @ViewChild(MultiFileUploadComponent, {static: true}) fileField: MultiFileUploadComponent;
  @Input() user: String;
  // Use Typescript intersection types to enable docorating the Array of firebase models with a shell model
  // (ref: https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types)
  images: Array<ImageModel> & ShellModel;
  uploadReady: boolean;
  @HostBinding('class.is-shell') get isShell() {
    return (this.images && this.images.isShell) ? true : false;
  }

  constructor(
    private modalController: ModalController,
    private imageService: FirebaseService,
    private storage: AngularFireStorage,
    private afs: AngularFirestore  ) {
      this.uploadReady = false;
    }

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
  upload() {

    const files = this.fileField.getFiles();
    if (files.length) {
      this.uploadReady = true;
    }

    console.log(files);

    const formData = new FormData();
    formData.append('somekey', 'some value'); // Add any other data you want to send

    files.forEach((file) => {
      formData.append('files[]', file.rawFile, file.name);
    });

    // POST formData to Server

  }
  async uploadImage(base64data) {

    const filePath = (`user/images/photo.jpg`);
    // const storageRef = firebase.storage().ref();

    const metadata = {
      contentType: 'image',
      cacheControl: 'public, max-age=31536000',
    };
    const ref = this.storage.ref(filePath);
    const task = ref.putString(base64data, 'data_url', metadata);
    const downloadURL = await task.snapshotChanges();

    downloadURL.subscribe(url => {
       if (url) {
           console.log(url);
           const userRef = this.afs.doc(`userProfile/` + this.user);
           return userRef.set({ 'avatar': url }, { merge: true });          }
    });

  }
  dismissModal(avatar?: ImageModel) {
    this.modalController.dismiss(avatar);
  }
}
