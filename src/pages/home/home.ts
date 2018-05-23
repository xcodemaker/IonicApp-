//import { Component } from '@angular/core';
//import { NavController,AlertController } from 'ionic-angular';
//import { AlertController } from 'ionic-angular';
import {LogHomePage} from '../log-home/log-home';
import {RegisterPage} from '../register/register';
import {FrogotPasswordPage} from '../frogot-password/frogot-password';
import { DatabaseProvider } from '../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, LoadingController, ModalController,AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AuthProvider } from '../../providers/auth/auth';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  form : FormGroup;
  hasError: boolean;
  errorMessage: string;
  loghomepage=LogHomePage;
  

  constructor(public navCtrl: NavController, public alerCtrl: AlertController,public database:DatabaseProvider,
    private app: App,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private auth: AuthProvider
  ) {
      this.form = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    
  }
  signInWithEmail() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password)
    .then(() => {
      loading.dismiss();
      this.navCtrl.push('LogHomePage');
    }, (error) => {
      loading.dismiss();
      switch (error.code) {
        case 'auth/invalid-email':
          this.errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/wrong-password':
          this.errorMessage = 'Incorrect username and password combination.';
          break;
        case 'auth/user-not-found':
          this.errorMessage = 'Incorrect username and password combination.';
          break;
        default:
          this.errorMessage = error;
          break;
      }
      this.hasError = true;
    });
  }
  signInWithFacebook() {
    this.auth.signInWithFacebook()
    .then(() => {
      this.navCtrl.push('LogHomePage');
    }, (error) => {
      console.log(error);
    });
  }

   navigateHome(){
     this.navCtrl.push('LogHomePage');
  }
  navigateToRegister(){
    this.navCtrl.push('RegisterPage');
  }
  navigateToFrogotPassword(){
    this.navCtrl.push('FrogotPasswordPage');
  }
  // doConfirm() {
  //   let confirm = this.alerCtrl.create({
  //     title: 'Alert',
  //     message: 'Stay logged in?',
  //     buttons: [
  //       {
  //         text: 'Disagree',
  //         handler: () => {
  //           console.log('Disagree clicked');
  //           this.navigateHome();

  //         }
  //       },
  //       {
  //         text: 'Agree',
  //         handler: () => {
  //           console.log('Agree clicked');
  //           this.navigateHome();
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present()
  // }
  navigateTo(page) {
    this.navCtrl.push(page);
  }
}
