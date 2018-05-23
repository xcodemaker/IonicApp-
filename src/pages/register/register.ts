import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  App, LoadingController,
  ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  form : FormGroup;
  hasError: boolean;
  errorMessage: string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private app: App,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private auth: AuthProvider) {
      this.form = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }
  signUp() {
    const loading = this.loadingCtrl.create({
      content: 'We are creating a user for you ...'
    });
    loading.present();

    this.auth.createUser(this.form.value.email, this.form.value.password).then(() => {
      loading.dismiss();
      this.navCtrl.setRoot('tabs');
    }, (error) => {
      loading.dismiss();
      switch (error.code) {
        case 'auth/invalid-email':
          this.errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          this.errorMessage = 'The password must be at least 6 characters long.';
          break;
        case 'auth/email-already-in-use':
          this.errorMessage = 'This email has already been used for another account.';
          break;
        default:
          this.errorMessage = error;
          break;
      }
      this.hasError = true;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  navigatePop() {
    this.navCtrl.pop();
  }

}
