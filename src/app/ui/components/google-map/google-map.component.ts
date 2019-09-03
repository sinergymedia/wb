import { Component, ElementRef, OnInit, EventEmitter, Input } from '@angular/core';
import { GeoService } from '../../../core/services/geo.service'
@Component({
  selector: 'google-map',
  template: ''
})
export class GoogleMapComponent implements OnInit {
  lat: number;
  lng: number;

  markers: any;
  subscription: any;

  constructor(private geo: GeoService) { }

  ngOnInit() {
    this.getUserLocation()
    this.subscription = this.geo.hits
        .subscribe(hits => this.markers = hits)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private getUserLocation() {
   /// locate the user
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
       this.lat = position.coords.latitude;
       this.lng = position.coords.longitude;


       this.geo.getLocations(100, [this.lat, this.lng])
     });
   }
 }
}
