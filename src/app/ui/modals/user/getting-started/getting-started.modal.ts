import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { CombinedUserModel } from '../../../../core/models/firebase.models';
import { FirebaseService } from '../../../../core/services/firebase.service';

// export class UserNames {
//   name: string./getting-started.modal
// }
@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.modal.html',
  styleUrls: [
    './styles/getting-started.modal.scss',
    './styles/getting-started.shell.scss',
    './styles/getting-started.responsive.scss'
  ]
})
export class GettingStartedModal implements OnInit {
  @Input() user: CombinedUserModel;


  gettingStartedForm: FormGroup;
  userData: CombinedUserModel = new CombinedUserModel();
  customPickerOptions: any;
  usernameText: string;
  usernameAvailable: boolean;
  userName: string;
  datePickerObj: any;
  selectedAvatar: string;
  validations = {
    'userName': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'usernameNotAvailable', message: 'Your username is already taken.' }
    ]
  };

  constructor(public menu: MenuController,
    public router: Router,
    private userService: FirebaseService,
    private modalController: ModalController
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
      clearButton: true, // default true
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
    this.selectedAvatar = this.user.avatar;
    this.menu.enable(false);
    this.gettingStartedForm = new FormGroup({

      displayName: new FormControl(this.user.displayName),
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      email: new FormControl(this.user.email, Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl(this.user.phone),
      birthday: new FormControl(this.user.birthday),
      text_notifications: new FormControl(true),
      email_notifications: new FormControl(true),
      measurement_units: new FormControl('N'),
      selected_color: new FormControl('default')
    });
  }

  //  checkUsername() {
  //   const usernameCollection = this.db.col$('usernames', ref => ref.where('username','==', this.usernameText));
  //   if (usernameCollection) {
  //    return this.usernameAvailable = true;
  //    } else {
  //      return this.usernameAvailable = false;
  //    }
  //   }

  updateUserData() {
    this.user.id = this.user.id;
    this.user.birthday = this.gettingStartedForm.value.birthday;
    this.user.displayName = this.gettingStartedForm.value.displayName;
    this.user.firstName = this.gettingStartedForm.value.firstName;
    this.user.lastName = this.gettingStartedForm.value.lastName;
    this.user.phone = this.gettingStartedForm.value.phone;
    this.user.email = this.gettingStartedForm.value.email;
    this.user.text_notifications = this.gettingStartedForm.value.text_notifications;
    this.user.email_notifications = this.gettingStartedForm.value.email_notifications;
    this.user.measurement_units = this.gettingStartedForm.value.measurement_units;
    this.user.color_scheme = this.gettingStartedForm.value.selected_color;
    const { ...userData } = this.user;
    this.userService.updateUser(userData).then(
      () => {
        this.modalController.dismiss().then(
          () => {
            this.router.navigate(['app/location/listing']);
          });
      });
  }

  changePhoto() {

  }
}
