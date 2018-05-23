import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the FrogotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-frogot-password',
  templateUrl: 'frogot-password.html',
})
export class FrogotPasswordPage {
  form : FormGroup;
  hasError: boolean;
  errorMessage: string;
  emailSent: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private auth: AuthProvider) {
      this.form = this.formBuilder.group({
        email: ['', Validators.required]
      });
  }
  signInWithEmail() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.sendPasswordResetEmail(this.form.value.email).then(() => {
      loading.dismiss();
      this.hasError = false;
      this.emailSent = true;
    }, (error) => {
      loading.dismiss();
      switch (error.code) {
        case 'auth/invalid-email':
          this.errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/user-not-found':
          this.errorMessage = 'No user with this email found.';
          break;
        default:
          this.errorMessage = error;
          break;
      }
      this.hasError = true;
    });
  }

  navigatePop() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrogotPasswordPage');
  }

}
