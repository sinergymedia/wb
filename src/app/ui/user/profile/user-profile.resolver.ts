import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CombinedUserModel } from '../../../core/models/firebase.models';
import { Data, DataService } from '../../../core/services/data.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { DataStore } from '../../../core/shell/data-store';

@Injectable()
export class UserProfileResolver implements Resolve<any> {
  user: Observable<Data>;
  userId: string;
  userData: any[];

  constructor(
    private data: DataService,
    private firebaseService: FirebaseService
  ) {
    this.user = this.data.items.pipe(
      map(items => items.find(item => item.id === 'userId'))
    );
    this.user.subscribe(user => {
      this.userId = user.value;
    });

    this.data.load('userId');
    console.log('userId from data service: ', this.userId);

  }

  resolve() {

    // We created a FirebaseCombinedLocationModel to combine the userData with the details of the userSkills (from the skills collection).
    // They are 2 different collections and we need to combine them into 1 dataSource.

    const userDataSource: Observable<CombinedUserModel> = this.firebaseService.getUserData(this.userId);

    const userDataStore: DataStore<CombinedUserModel> = this.firebaseService.getUserStore(userDataSource);


    return userDataStore;
  }
}
