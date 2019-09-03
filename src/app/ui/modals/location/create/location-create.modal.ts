import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';
import { LocationModel } from '../../../../core/models/firebase.models';
import { MapPlace, MapsModel } from '../../../../core/models/maps.model';
import { FirebaseService } from '../../../../core/services/firebase.service';
import { FirestoreService } from '../../../../core/services/firestore.service';
import { MapService } from '../../../../core/services/map.service';
import { ToastService } from '../../../../core/services/toast.service';
import { AddDealModal } from './add-deal/add-deal.modal';
const geo = geofirex.init(firebase);

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.modal.html',
  styleUrls: ['./location-create.modal.scss'],
})
export class LocationCreateModal implements OnInit {
  map_model: MapsModel = new MapsModel();
  selectedDeals: any = [];
  newLocationForm: FormGroup;
  locationData: LocationModel = new LocationModel;
  photos: any = [];
  coords;
  point;
  lat;
  lng;
  checked = [];
  data: Array<any>;
  place_id: string;
  exists: boolean;
  hours;
  selectedLocation;

  constructor(
    private modalController: ModalController,
    public GMS: MapService,
    public firebaseService: FirebaseService,
    private db: FirestoreService,
    public afs: AngularFirestore,
    public toastCtrl: ToastController,
    public keyboard: Keyboard,
    private _formBuilder: FormBuilder,
    public toast: ToastService


  ) {
    this.exists = false;
  }

  ngOnInit() {
    // default image

    this.newLocationForm = this._formBuilder.group({
      name: new FormControl('', Validators.required),
      formatted_address: new FormControl('', Validators.required),
      formatted_phone_number: new FormControl('', Validators.required),
      website: new FormControl(''),
      place_id: new FormControl(this.place_id),
      price_level: new FormControl(''),
      reviews: new FormControl(''),
      status: new FormControl('active', Validators.required),
      rating: new FormControl(''),
      icon: new FormControl(''),
      address_components: new FormControl(''),
      opening_hours: new FormControl(),
      photos: new FormControl(this.photos),
      coords: new FormControl(),
      lat: new FormControl(),
      lng: new FormControl()
    });
  }
  searchPlacesPredictions(query: string) {
    const env = this;
    if (query !== '') {
      env.GMS.getPlacePredictions(query).subscribe(
        places_predictions => {
          env.map_model.search_places_predictions = places_predictions;
        }, e => { console.log('onError: %s', e); },
        () => { console.log('onCompleted'); }
      );
    } else { env.map_model.search_places_predictions = []; }
  }
  checkExists(id: string) {
    this.afs.firestore.doc('locations/' + id).get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          return this.exists = true;
        } else {
          return this.exists = false;
        }
      });
  }

  async selectSearchResult(place: google.maps.places.AutocompletePrediction) {
    this.afs.firestore.doc('locations/' + place.place_id).get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          this.toast.showToast('This location is already active. Please use the location details page to edit this location.', 3500);
          this.clearSearch();
        } else {
          const env = this;

          env.map_model.search_query = place.description;

          // We need to get the location from this place. Let's geocode this place!
          env.GMS.geocodePlace(place.place_id).subscribe(
            place_location => {
              this.point = geo.point(this.lat, this.lng);

              this.coords = [place_location.lat(), place_location.lng()];

            });

          env.GMS.getPlaceDetails(place.place_id, ['photos', 'geometry', 'place_id', 'icon', 'name',
           'formatted_phone_number', 'website', 'reviews', 'rating', 'price_level', 'opening_hours',
            'formatted_address', 'address_components'])
            .subscribe(
            place_details => {
              console.log('details:', place_details);
              this.data = place_details;


              this.place_id = place.place_id;
              env.setDetails(place_details);

            },
            e => {
              console.log('onError: %s', e);
            },
            () => {
              console.log('onCompleted:');
            });

          this.clearSearch();

        }
      });

  }
  async clearSearch() {
    await this.keyboard.hide;
  }
 async setDetails(location) {
   this.selectedLocation = location;
   this.lat = await location.geometry.location.lat();
   this.lng = await location.geometry.location.lng();
    this.newLocationForm.patchValue({
      name: location.name,
      formatted_phone_number: location.formatted_phone_number,
      formatted_address: location.formatted_address,
      website: location.website,
      photos: this.photos,
      rating: location.rating,
      price_level: location.price_level,
      reviews: location.reviews,
      icon: location.icon,
      place_id: location.place_id,
      address_components: location.address_components,
      lat: this.lat,
      lng: this.lng,
    });


  }
  choosePlace(place: MapPlace) {
    const env = this;
    console.log('seleced', place.selected);
    // Check if the place is not already selected
    if (!place.selected) {
      // De-select previous places
      env.map_model.deselectPlaces();
      // Select current place
      place.select();

    }
  }


  async dismissModal() {
    await this.modalController.dismiss();
  }

  async createLocation() {
    const f = this.newLocationForm.value;
    const d = this.locationData;
    d.name = f.name;
    d.id = f.place_id;

    d.formatted_address = f.formatted_address;
    d.formatted_phone_number = f.formatted_phone_number;
    d.address_components = f.address_components;
    d.status = f.status;
    d.lat = this.lat;
    d.lng = this.lng;
    d.reviews = f.reviews || [''];
    d.rating = f.rating || 0;
    d.price_level = f.price_level || 0;
    d.website = f.website || 'https://wiscobogos.com';
    d.photos = this.photos || ['https://wiscobogos.com/assets/images/hp-logo.png'];
    if (!f.opening_hours) { d.opening_hours = null; } else { d.opening_hours = f.opening_hours; }
    d.coverPhoto = this.photos[0] || ['https://wiscobogos.com/assets/images/hp-logo.png'];
    const { ...locationData } = this.locationData;

    await this.firebaseService.createLocation(locationData);
      const loc = await geo.point(this.lat, this.lng);
      const point = geo.collection('points');
      const locRef = this.db.doc('locations/' + this.locationData.id);
      locRef.update({ position: loc.data });
      this.dismissModal().then(() => {
      this.openAddDealModal(this.locationData);
    });
  }
  // uploadImageToFirebase(image) {
  //   image = this.webView.convertFileSrc(image);
  //   this.webView.convertFileSrc(image)

  //   //uploads img to firebase storage
  //   this.locationService.uploadImage(image, 'images', 'locations', this.locationData.id)
  // }
  async openAddDealModal(data) {
    const modal = await this.modalController.create({
      component: AddDealModal,
      componentProps: {
        'location': data.name,
        'id': this.place_id,
      }

    });

    await modal.present();

  }

}
