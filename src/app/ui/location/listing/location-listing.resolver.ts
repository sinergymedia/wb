import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CombinedUserModel, LocationListingModel } from '../../../core/models/firebase.models';
import { Data, DataService } from '../../../core/services/data.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { DataStore } from '../../../core/shell/data-store';

@Injectable()
export class LocationListingResolver implements Resolve<any> {
  lat: number;
  lng: number;
  userId: Observable<Data>;
  id: string;

  constructor(
    private locationService: FirebaseService,
    private data: DataService,
  ) {
    this.userId = this.data.items.pipe(
      map(items => items.find(item => item.id === 'userId'))
    );
    this.data.load('userId');
  }
  resolve() {
    this.userId.subscribe(user => {
      this.id = user.value;
    });
    const locationListingDataSource = this.locationService.getLocationListingWithDistanceDataSource();
    const locationListingDataStore: DataStore<Array<LocationListingModel>> = this.locationService.getLocationListingStore(locationListingDataSource);
    const userDataSource: Observable<CombinedUserModel> = this.locationService.getUserData(this.id);
    const userDataStore: DataStore<CombinedUserModel> = this.locationService.getUserStore(userDataSource);


    return { locations: locationListingDataStore, user: userDataStore };
  }
}
