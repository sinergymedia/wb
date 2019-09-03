import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationListingModel, UserModel } from '../../../core/models/firebase.models';
import { AuthService } from '../../../core/services/auth.service';
import { Data, DataService } from '../../../core/services/data.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { DataStore, ShellModel } from '../../../core/shell/data-store';
import { LocationCreateModal } from '../../modals/location/create/location-create.modal';

@Component({
  selector: 'app-location-listing',
  templateUrl: './location-listing.page.html',
  styleUrls: [
    './styles/location-listing.page.scss',
    './styles/location-listing.shell.scss',
    './styles/location-listing.ios.scss'
  ],
})
export class LocationListingPage implements OnInit {
  priceLevelForm: FormGroup;
  searchQuery: string;
  showSearchFilter = false;
  showPriceLevelFilter = false;
  admin = false;
  listingDataStore: DataStore<Array<LocationListingModel>>;
  items: Array<LocationListingModel> & ShellModel;
  filter: boolean;
  userData: Observable<Data>;
  userId: string;
  user: UserModel;
  @HostBinding('class.is-shell') get isShell() {
    return (this.items && this.items.isShell) || (this.user && this.user.isShell) ? true : false;
  }
  constructor(
    public firebaseService: FirebaseService,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private auth: AuthService,
    private data: DataService,

  ) {}

  async ngOnInit() {
    this.priceLevelForm = new FormGroup({
      price: new FormControl(),
    });
    this.searchQuery = '';
    if (this.searchQuery || this.priceLevelForm.value.price) { this.filter = true; } else {
      this.filter = false;
    }
    this.route.data.subscribe((resolvedRouteData) => {
      const userDataStore: DataStore<UserModel> = resolvedRouteData['data'].user;
      this.listingDataStore = resolvedRouteData['data'].locations;
      userDataStore.state.subscribe(
        (state) => {
          this.user = state;
        });
      this.listingDataStore.state.subscribe(
        (state) => {
          this.items = state;
        },
        (error) => console.log(error),
        () => console.log('stateSubscription completed')
      );
    },
      (error) => console.log(error)
    );
    this.userData = this.data.items.pipe(
      map(items => items.find(item => item.id === 'user'))
    );
    this.data.load('user');
  }

  clearAll() {
    this.searchQuery = '';
    this.showSearchFilter = false;
    this.showPriceLevelFilter = false;
    this.priceLevelForm.patchValue({
      price: undefined
    });
  }

  logOut() {
    this.auth.signOut();
  }

  searchFilter(location: LocationListingModel): boolean {
    if (this.priceLevelForm.value.price && this.searchQuery) {
      const name = location.name.toLowerCase().replace(/.\s+'\s+`\s+-/g, '');
      const price = location.price_level;
      const search = this.searchQuery.toLowerCase().replace(/.\s+'\s+`\s+-/g, '');
      if (!name.includes(search) || price > this.priceLevelForm.value.price) {
        return true;
      } else {
        return false;
      }
    }
    if (!this.priceLevelForm.value.price && this.searchQuery) {
      const name = location.name.toLowerCase().replace(/.\s+'\s+`\s+-/g, '');
      const search = this.searchQuery.toLowerCase().replace(/.\s+'\s+`\s+-/g, '');
      if (!name.includes(search)) {
        return true;
      } else { return false; }
    }
    if (this.priceLevelForm.value.price && !this.searchQuery) {
      const price = location.price_level;
      if (price >= this.priceLevelForm.value.price) {
        return true;
      } else { return false; }
    }

  }

  async openLocationCreateModal() {
    const modal = await this.modalController.create({
      component: LocationCreateModal
    });
    await modal.present();
  }
}
