import { Component, OnInit, AfterViewInit, ViewChild, HostBinding } from '@angular/core';

import { IonSlides, MenuController } from '@ionic/angular';
import { FirestoreService } from '../core/services/firestore.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: [
    './styles/walkthrough.page.scss',
    './styles/walkthrough.shell.scss',
    './styles/walkthrough.responsive.scss'
  ]
})
export class WalkthroughPage implements OnInit, AfterViewInit {
  slidesOptions: any = {
    zoom: {
      toggle: false // Disable zooming to prevent weird double tap zomming on slide images
    }
  };
  currentUser;
  pageData: any;
  stats;
  locations;

  @ViewChild(IonSlides, {static: true}) slides: IonSlides;

  @HostBinding('class.first-slide-active') isFirstSlide = true;

  @HostBinding('class.last-slide-active') isLastSlide = false;

  constructor(public menu: MenuController, private db: FirestoreService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.currentUser = this.afAuth.authState.pipe(first());
    if (this.currentUser) {
      this.router.navigate(['./app/location/listing']);
    }
        this.menu.enable(false);

  }

  ngAfterViewInit(): void {
    this.stats = this.db.col$('stats');
    this.pageData = this.db.doc$('pages/walkthrough');
    // ViewChild is set
    this.slides.isBeginning().then(isBeginning => {
      this.isFirstSlide = isBeginning;
    });
    this.slides.isEnd().then(isEnd => {
      this.isLastSlide = isEnd;
    });

    // Subscribe to changes
    this.slides.ionSlideWillChange.subscribe(changes => {
      this.slides.isBeginning().then(isBeginning => {
        this.isFirstSlide = isBeginning;
      });
      this.slides.isEnd().then(isEnd => {
        this.isLastSlide = isEnd;
      });
    });
  }

  skipWalkthrough(): void {
    // Skip to the last slide
    this.slides.length().then(length => {
      this.slides.slideTo(length);
    });
  }
}
