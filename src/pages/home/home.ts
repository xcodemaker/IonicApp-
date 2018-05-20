import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
//import { AlertController } from 'ionic-angular';
import {LogHomePage} from '../log-home/log-home';
import {RegisterPage} from '../register/register';
import {FrogotPasswordPage} from '../frogot-password/frogot-password';
import { DatabaseProvider } from '../../providers/database/database';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loghomepage=LogHomePage;
  public employee=["dhammika","aafsad"];

  constructor(public navCtrl: NavController, public alerCtrl: AlertController,public database:DatabaseProvider) {
    this.database.createPouchDB();
    this.database.create(this.employee);
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
  doConfirm() {
    let confirm = this.alerCtrl.create({
      title: 'Alert',
      message: 'Stay logged in?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
            this.navigateHome();

          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            this.navigateHome();
          }
        }
      ]
    });
    confirm.present()
  }
}
