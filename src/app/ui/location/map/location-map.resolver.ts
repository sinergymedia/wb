import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStore } from '../../../core/shell/data-store';
import { LocationListingModel } from '../../../core/models/firebase.models';
import { FirebaseService } from '../../../core/services/firebase.service';

@Injectable()
export class LocationMapResolver implements Resolve<any> {
  constructor(private firebaseService: FirebaseService,
  ) { }

  resolve() {
    const dataSource: Observable<Array<LocationListingModel>> = this.firebaseService.getLocationListingDataSource();

    const dataStore: DataStore<Array<LocationListingModel>> = this.firebaseService.getLocationListingStore(dataSource);

    return dataStore;
  }
}
