import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataStore, ShellModel } from '../../../core/shell/data-store';
import { CombinedUserModel, RedeemedDealModel } from '../../../core/models/firebase.models';
import { AuthService } from '../../../core/services/auth.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { UserUpdateModal } from '../../modals/user/update/user-update.modal';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: [
    './styles/user-profile.page.scss',
    './styles/user-profile.shell.scss',
    './styles/user-profile.ios.scss',
    './styles/user-profile.md.scss'
  ],
})
export class UserProfilePage implements OnInit {
  user: CombinedUserModel;
  // relatedUsers: Array<UserItemModel> & ShellModel;
  segmentValue = 'redeemedDeals';
  translations;

  @HostBinding('class.is-shell') get isShell() {
    return ((this.user && this.user.isShell)) ? true : false;  }
  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    public alertController: AlertController,
    public modalController: ModalController,
    private auth: AuthService,
    private storage: LocalStorageService,
    private platform: Platform

  ) { }
  ngOnInit() {
    this.route.data.subscribe((resolvedRouteData) => {
      const resolvedDataStores = resolvedRouteData['data'];
      const userDataStore: DataStore<CombinedUserModel> = resolvedDataStores;

      userDataStore.state.subscribe(
        (state) => {
          this.user = state;
        }
      );
    });
  }
  signOut() {
    this.auth.signOut();
}
  async openUserUpdateModal() {
    const modal = await this.modalController.create({
      component: UserUpdateModal,
      componentProps: {
        'user': this.user
      }
    });

    await modal.present();
  }

  segmentChanged(ev): void {
    this.segmentValue = ev.detail.value;
  }
}
