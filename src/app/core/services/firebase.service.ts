import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { DocumentReference } from '@firebase/firestore-types';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import 'firebase/firestore';
import 'firebase/storage';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { flatMap, map, first, mergeMap, take, concatMap, reduce } from 'rxjs/operators';
import { FirestoreService } from '../../core/services/firestore.service';
import { DataStore } from '../../core/shell/data-store';
import {
    ActiveDealCUDModel,
    ActiveDealModel,
    BaseDealCUDModel,
    CombinedLocationModel,
    CombinedUserModel,
    ImageModel,
    LocationCUDModel,
    LocationListingModel,
    LocationModel,
    RedeemedDealModel,
    UserCUDModel,
    UserModel
} from '../models/firebase.models';
import { DataService } from './data.service';


// import * as geofirex from 'geofirex';
// import { GeoFirePoint } from 'geofirex';
@Injectable()
export class FirebaseService implements OnInit {

    year;
    month;
    lat;
    lng;
    active: boolean;
    userId: string;
    date;
    status: string;
    admin: boolean;
    userData: any;
    currentUser;

    // geo = geofirex.init(firebase);
    // Listing Page

    private userDataStore: DataStore<CombinedUserModel>;
    private locationListingDataStore: DataStore<Array<LocationListingModel>>;
    private activeDealListingDataStore: DataStore<Array<ActiveDealModel>>;
    private locationDetailsDataStore: DataStore<CombinedLocationModel>;
    private imageDataStore: DataStore<Array<ImageModel>>;

    constructor(
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
        private db: FirestoreService,
        private platform: Platform,
        private geoLocation: Geolocation,
        private data: DataService,

    ) {

        // this.initUserData();
        this.month = moment().format('MM');
        this.year = moment().format('YY');
        this.date = moment();
        this.loadUserGps();
          }
         async ngOnInit() {
      await this.afAuth.authState.subscribe( user => {
            if (user) {
               this.userId = user.uid;
               this.data.create({ 'id': 'userId', 'value':  user.uid });
              }
          });

          }
    /*
     Set Initial User Data
    */

    loadUserGps() {
        if (this.platform.is('cordova')) {
            this.geoLocation.getCurrentPosition().then((resp) => {
                this.lat = resp.coords.latitude;
                this.lng = resp.coords.longitude;

            });
        } else {
            navigator.geolocation.getCurrentPosition(position => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
            });
        }
    }
    setUserData(userId: string) {
                // const userData = this.getUserProfile(user.uid);
                this.afs.doc<CombinedUserModel>('userProfile/' + userId)
                    .snapshotChanges()
                    .pipe(
                        map(a => {
                            const userData = a.payload.data();
                            this.userId = a.payload.id;
                            this.status = userData.status;
                            this.admin = userData.admin;
                        })
                    );
                this.userData = [{'status': this.status, 'admin': this.admin, 'lat': this.lat, 'lng': this.lng }];
                this.data.create({ 'id': 'userData', 'value': this.data });
                this.data.create({ 'id': 'userId', 'value': this.userId });
    }

    /*
   Deal Methods
  */
    public getActiveDeals(locationId: string): Observable<Array<ActiveDealModel>> {
        const locRef = this.afs.doc('locations/' + locationId).ref;
        return this.afs.collection<ActiveDealModel>('activeDeals',
            ref => ref.where('location', '==', locRef))
            .valueChanges({ idField: 'id' });
    }

    private getRedeemedDeals(userId: string): Observable<Array<RedeemedDealModel>> {
        const userRef = this.afs.doc('userProfile/' + userId).ref;
        return this.afs.collection<RedeemedDealModel>('redeemedDeals/',
            ref => ref.where('userRef', '==', userRef))
            .valueChanges();
    }
    /*
     Location Methods
    */

    public getLocationData(locationId: string): Observable<CombinedLocationModel> {

        return this.afs.doc<LocationModel>('locations/' + locationId)
            .valueChanges()
            .pipe(
                flatMap(a => this.getActiveDeals(locationId).map(deals => {
                    const id = a.place_id;
                    return { id, activeDeals: deals, ...a } as CombinedLocationModel;
                })
                )
            );
    }
    public getLocationListingDataSource(): Observable<Array<LocationListingModel>> {
        return this.afs.collection<LocationListingModel>('locations').valueChanges({ idField: 'id' })
            .pipe(
                map(actions => actions.map(location => {
                    return { ...location } as LocationListingModel;
                })
                )
            );
    }

    public getLocationListingWithDistanceDataSource(): Observable<Array<LocationListingModel>> {
        let userLat;
        let userLng;
        this.geoLocation.getCurrentPosition().then(res => {
            userLat = res.coords.latitude;
            userLng = res.coords.longitude;
        });
        return this.afs.collection<LocationListingModel>('locations').valueChanges({ idField: 'id' })
            .pipe(map(locations => locations
                .map(location => {
                    const lat = location.lat;
                    const lng = location.lng;
                    const id = location.id;
                    const distance = this.getLocationDistance(lat, lng, userLat, userLng, 'N');
                    return { id, distance, ...location } as LocationListingModel;
                })
            ));
    }

    /*
     User Methods
    */

   public getUserData(userId: string): Observable<CombinedUserModel> {
    const userRef = this.afs.doc('userProfile/' + userId).ref;

       console.log('userId: ', userId);
    return this.afs.doc<UserModel>('userProfile/' + userId)
        .snapshotChanges()
        .pipe(
            mergeMap(a => this.afs.collection<RedeemedDealModel>('redeemedDeals/',
            ref => ref.where('user', '==', userRef))
            .valueChanges().pipe(map(deals => {
                console.log('redeemed Ids from firebase service:',)
                const id = a.payload.id;
                const data = a.payload.data();
               const rIds =  deals.map(deal => {
                const redeemedIds = [];
                    redeemedIds.push(deal.redeemId);
                    return redeemedIds;
                });
                                return { id, redeemedDeals: deals, rIds: rIds, ...a.payload.data() } as CombinedUserModel;
            })
            ))
        );
}
public getUserWithLocationData(userId: string, locationId: string): Observable<CombinedUserModel> {
    const userRef = this.afs.doc('userProfile/' + userId).ref;
    const locRef = this.afs.doc('location/' + locationId).ref;

       console.log('userId: ', userId);
    return this.afs.doc<UserModel>('userProfile/' + userId)
        .snapshotChanges()
        .pipe(
            mergeMap(a => this.afs.collection<RedeemedDealModel>('redeemedDeals/',
            ref => ref
            .where('user', '==', userRef)
            .where('location', '==', locRef)
            .where('year', '==', this.year)
            .where('month', '==', this.month)
            )
            .valueChanges().pipe(map(deals => {
                const id = a.payload.id;
                return { id, redeemedDeals: deals, ...a.payload.data() } as CombinedUserModel;
            })
            ))
        );
}

    /*
     Active Deal Store
    */
   public getActiveDealStore(dataSource: Observable<Array<ActiveDealModel>>): DataStore<Array<ActiveDealModel>> {
    // Use cache if available
    if (!this.locationListingDataStore) {
        // Initialize the model specifying that it is a shell model
        const shellModel: Array<ActiveDealModel> = [
            new ActiveDealModel(),
            new ActiveDealModel(),
            new ActiveDealModel(),
        ];

        this.activeDealListingDataStore = new DataStore(shellModel);
        // Trigger the loading mechanism (with shell) in the dataStore
        this.activeDealListingDataStore.load(dataSource);
    }
    return this.activeDealListingDataStore;
}

    /*
     Location Store
    */
   public getLocationListingStore(dataSource: Observable<Array<LocationListingModel>>): DataStore<Array<LocationListingModel>> {
    // Use cache if available
    if (!this.locationListingDataStore) {
        // Initialize the model specifying that it is a shell model
        const shellModel: Array<LocationListingModel> = [
            new LocationListingModel(),
            new LocationListingModel(),
            new LocationListingModel(),
        ];

        this.locationListingDataStore = new DataStore(shellModel);
        // Trigger the loading mechanism (with shell) in the dataStore
        this.locationListingDataStore.load(dataSource);
    }
    return this.locationListingDataStore;
}


    public getCombinedLocationStore(dataSource: Observable<CombinedLocationModel>): DataStore<CombinedLocationModel> {
        // Initialize the model specifying that it is a shell model
        const shellModel: CombinedLocationModel = new CombinedLocationModel();

        this.locationDetailsDataStore = new DataStore(shellModel);
        // Trigger the loading mechanism (with shell) in the dataStore
        this.locationDetailsDataStore.load(dataSource);

        return this.locationDetailsDataStore;
    }


    /*
     User Store
    */
    public getUserStore(dataSource: Observable<CombinedUserModel>): DataStore<CombinedUserModel> {
        // Initialize the model specifying that it is a shell model
        const shellModel: CombinedUserModel = new CombinedUserModel();

        this.userDataStore = new DataStore(shellModel);
        // Trigger the loading mechanism (with shell) in the dataStore
        this.userDataStore.load(dataSource);

        return this.userDataStore;
    }


    /*
     C(-R)UD
    */

    /*
         Deal
    */
    public createDeal(userData: BaseDealCUDModel): Promise<DocumentReference> {
        return this.afs.collection('deals').add({ ...userData });
    }

    public updateDeal(dealData: BaseDealCUDModel): Promise<void> {
        return this.afs.collection('deals').doc(dealData.dealId).set(dealData);
    }

    public deleteDeal(dealKey: string): Promise<void> {
        return this.afs.collection('deals').doc(dealKey).delete();
    }

    /*
        Location
    */
    public createLocation(locationData: LocationCUDModel): Promise<DocumentReference> {
        return this.afs.collection('locations').add({ ...locationData });
    }

    public updateLocation(locationData: LocationCUDModel): Promise<void> {
        return this.afs.collection('locations').doc(locationData.id).set(locationData);
    }
    public deleteLocation(locationKey: string): Promise<void> {
        return this.afs.collection('locations').doc(locationKey).delete();
    }
    public createLocationDeal(locationId: string, dealData: ActiveDealCUDModel[]): Promise<void> {
        return this.afs.doc('activeDeals').set(dealData);
    }
    /*
            Location Deals
    */

    public updateLocationDeal(activeDealId: string, dealData: ActiveDealCUDModel[]): Promise<void> {
        return this.afs.collection('activeDeals').doc(activeDealId).set(dealData);
    }
    public deleteLocationDeal(dealKey: string): Promise<void> {
        return this.afs.collection('activeDeals').doc(dealKey).delete();
    }

    /*
        User
    */

    public createUser(userData: UserCUDModel): Promise<void> {
        return this.db.upsert('userProfile/' + userData.id, { ...userData });
    }
    public updateUser(userData: UserCUDModel): Promise<void> {
        return this.afs.collection('userProfile').doc(userData.id).set(userData);
    }

    getLocationDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit) {
        const radlat1 = Math.PI * lat1 / 180;
        const radlat2 = Math.PI * lat2 / 180;
        const radlon1 = Math.PI * lon1 / 180;
        const radlon2 = Math.PI * lon2 / 180;
        const theta = lon1 - lon2;
        const radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === 'K') { dist = dist * 1.609344; }
        if (unit === 'N') { dist = dist * 0.8684; }
        return dist;
    }
    public GetImageDataSource(source: string, folder: string): Observable<Array<ImageModel>> {
        return this.afs.collection<ImageModel>('images/' + source + '/' + folder).valueChanges();
    }

    public getImageStore(dataSource: Observable<Array<ImageModel>>): DataStore<Array<ImageModel>> {
        // Use cache if available
        if (!this.imageDataStore) {
            // Initialize the model specifying that it is a shell model
            const shellModel: Array<ImageModel> = [
                new ImageModel(),
            ];

            this.imageDataStore = new DataStore(shellModel);
            // Trigger the loading mechanism (with shell) in the dataStore
            this.imageDataStore.load(dataSource);
        }
        return this.imageDataStore;
    }


}
