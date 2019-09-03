import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';
import { Observable, ReplaySubject } from 'rxjs';
import { LocationListingModel } from '../../../core/models/firebase.models';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { DataStore, ShellModel } from '../../../core/shell/data-store';
const geo = geofirex.init(firebase);

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.page.html',
  styleUrls: [
    './styles/location-map.page.scss',
    './styles/location-map.shell.scss',
    './styles/location-map.responsive.scss'
  ]
})
export class LocationMapPage implements OnInit {
  searchQuery: number;
  lat: number;
  lng: number;
  searchSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  searchFiltersObservable: Observable<any> = this.searchSubject.asObservable();
  distance: number;
  markers: any;
  infoWindowOpened = null;
  previous_info_window = null;
  listingDataStore: DataStore<Array<LocationListingModel>>;
  admin: boolean;
  adminList: string[];
  items: Array<LocationListingModel> & ShellModel;
  gps: any;
  @HostBinding('class.is-shell') get isShell() {
    return (this.items && this.items.isShell) ? true : false;
  }
  constructor(
    public firebaseService: FirebaseService,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private storage: LocalStorageService,

  ) {
    this.lat = 43.075526;
    this.lng = -89.384062;


  }

  async ngOnInit() {
    const position = await this.storage.get('position');
    if (!position) {
      this.lat = 43.075526;
      this.lng = -89.384062;
    } else {
      this.lat = position.lat;
      this.lng = position.lng;
    }
    this.route.data.subscribe((resolvedRouteData) => {
      this.listingDataStore = resolvedRouteData['data'];

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
  }
  close_window() {
    if (this.previous_info_window != null) {
      this.previous_info_window.close();
    }
  }
  select_marker(infoWindow) {
    if (this.previous_info_window == null) {
      this.previous_info_window = infoWindow;
    } else {
      this.infoWindowOpened = infoWindow;
      this.previous_info_window.close();
    }
    this.previous_info_window = infoWindow;
  }
}
