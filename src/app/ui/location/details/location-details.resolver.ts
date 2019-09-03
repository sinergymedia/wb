import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CombinedLocationModel, CombinedUserModel, ActiveDealModel } from '../../../core/models/firebase.models';
import { Data, DataService } from '../../../core/services/data.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { DataStore } from '../../../core/shell/data-store';

@Injectable()
export class LocationDetailsResolver implements Resolve<any> {
  userId: Observable<Data>;
  user: string;
  constructor(
    private locationService: FirebaseService,
    private data: DataService
  ) {
    this.userId = this.data.items.pipe(
      map(items => items.find(item => item.id === 'userId'))
    );
    this.data.load('userId');
  }

  resolve(route: ActivatedRouteSnapshot) {
    this.userId.subscribe(user => {
      this.user = user.value;
    });
    const locationId = route.paramMap.get('locationId');
    const locationDataSource: Observable<CombinedLocationModel> = this.locationService.getLocationData(locationId);
    const locationDataStore: DataStore<CombinedLocationModel> = this.locationService.getCombinedLocationStore(locationDataSource);

    const userDataSource: Observable<CombinedUserModel> = this.locationService.getUserData(this.user);
    const userDataStore: DataStore<CombinedUserModel> = this.locationService.getUserStore(userDataSource);
    const dealDataSource: Observable<Array<ActiveDealModel>> = this.locationService.getActiveDeals(locationId);
    const dealDataStore: DataStore<Array<ActiveDealModel>> = this.locationService.getActiveDealStore(dealDataSource);
    return { location: locationDataStore,  user: userDataStore, deals: dealDataStore };
  }
}
