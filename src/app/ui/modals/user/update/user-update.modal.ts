import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { UserCUDModel } from '../../../../core/models/firebase.models';
import { FirebaseService } from '../../../../core/services/firebase.service';
import { SelectUserImageModal } from '../select-image/select-image.modal';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.modal.html',
  styleUrls: ['./user-update.modal.scss'],
})
export class UserUpdateModal implements OnInit {

  // "user" is passed in firebase-details.page
  @Input() user: UserCUDModel;

  updateUserForm: FormGroup;
  interests = [];
  datePickerObj: any;
  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    public userService: FirebaseService,
    public router: Router,
  ) {
    this.datePickerObj = {
      inputDate: new Date('07-10-1981'), // default new Date()
      // fromDate: new Date('2016-12-08'), // default null
      // toDate: new Date('2018-12-28'), // default null
      showTodayButton: true, // default true
      closeOnSelect: false, // default false
      // disableWeekDays: [4], // default []
      // mondayFirst: true, // default false
      setLabel: 'Set',  // default 'Set'
      todayLabel: 'Today', // default 'Today'
      closeLabel: 'Close', // default 'Close'
      disabledDates: [],
      titleLabel: 'Select a Date', // default null
      monthsList: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      dateFormat: 'MM-DD-YYYY', // default DD MMM YYYY
      clearButton : true , // default true
      momentLocale: 'en-US', // Default 'en-US'
      yearInAscending: false, // Default false
      btnCloseSetInReverse: false, // Default false
      btnProperties: {
        expand: 'block', // Default 'block'
        fill: 'primary', // Default 'solid'
        size: '', // Default 'default'
        disabled: '', // Default false
        strong: '', // Default false
        color: 'secondary' // Default ''
      },
      arrowNextPrev: {
        nextArrowSrc: 'assets/svg/right.svg',
        prevArrowSrc: 'assets/svg/left.svg'
      }, // This object supports only SVG files.
};
  }

  ngOnInit() {
    this.updateUserForm = new FormGroup({
      displayName: new FormControl(this.user.displayName),
      firstName: new FormControl(this.user.firstName || undefined),
      lastName: new FormControl(this.user.lastName || undefined),
      email: new FormControl(this.user.email, Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl(this.user.phone || '', Validators.required),
      birthday: new FormControl(this.user.birthday || undefined),
      text_notifications: new FormControl(this.user.text_notifications || true, Validators.required),
      email_notifications: new FormControl(this.user.email_notifications || true, Validators.required),
      measurement_units: new FormControl(this.user.measurement_units || 'N', Validators.required),
      selected_color: new FormControl(this.user.color_scheme || undefined)

    });
    // this.userService.getRedeemedDeals(this.user.id).subscribe(interests => {
    //   this.interests = interests;
    //   // create skill checkboxes
    //   this.interests.map((interest) => {
    //     let userInterestIds = [];
    //     if (this.user.interests) {
    //       userInterestIds = this.user.interests.map(function(interestId) {
    //         return interestId['id'];
    //       });
    //     }
    //     // set the control value to 'true' if the user already has this skill
    //     const control = new FormControl(userInterestIds.includes(interest.id));
    //     (this.updateUserForm.controls.interests as FormArray).push(control);
    //   });
    // });
  }

  dismissModal() {
    this.modalController.dismiss();
  }
  async changePhoto() {
    const modal = await this.modalController.create({
      component: SelectUserImageModal,
      componentProps: {
        'user': this.user.id,
      }
    });
    modal.onDidDismiss().then(avatar => {
      if (avatar.data != null) {
        this.user.avatar = avatar.data.link;
      }
    });
    await modal.present();
  }



  updateUser() {
    this.user.birthday = this.updateUserForm.value.birthday;
    this.user.displayName = this.updateUserForm.value.displayName;
    this.user.firstName = this.updateUserForm.value.firstName;
    this.user.lastName = this.updateUserForm.value.lastName;
    this.user.phone = this.updateUserForm.value.phone;
    this.user.email = this.updateUserForm.value.email;
    this.user.text_notifications = this.updateUserForm.value.text_notifications;
    this.user.email_notifications = this.updateUserForm.value.email_notifications;
    if (this.updateUserForm.value.measurement_units = true) {
      this.user.measurement_units = 'N';
    } else {
      this.user.measurement_units = 'K';
    }
    this.user.color_scheme = this.updateUserForm.value.selected_color;

    this.userService.updateUser(this.user)
      .then(
        () => this.modalController.dismiss(),
        err => console.log(err)
      );
  }

}
