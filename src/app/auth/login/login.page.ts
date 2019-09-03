import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  webDemo: boolean;
  newUser = true; // to toggle login or signup form

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,

  ) { }

  /// Social Login
  ngOnInit() {
    this.webDemo = false;
  }
}
