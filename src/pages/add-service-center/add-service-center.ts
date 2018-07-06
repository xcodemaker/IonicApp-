import { ServiceCenter } from './../../models/service-center/service-center.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {FormControl} from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { DataProvider } from '../../providers/data/data';

export class State {
  constructor(public name: string, public population: string, public flag: string) { }
}

/**
 * Generated class for the AddServiceCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-service-center',
  templateUrl: 'add-service-center.html',
})
export class AddServiceCenterPage {
  hasError: boolean;
  errorMessage: string;
  serviceCenter = {} as ServiceCenter;

  serviceListRef$: FirebaseListObservable<ServiceCenter[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DataProvider,public alertCtrl: AlertController) {
    this.serviceListRef$ = this.database.list('service-center');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddServiceCenterPage');
  }
  addServiceCenter(serviceCenter: ServiceCenter) {
    //this.tyreListRef$ = this.database.list(`tyre-list/${this.tyreList.tyreNumber}`);

    if (typeof(serviceCenter.name) == "undefined"){
        this.errorMessage="Service center name not entered";
        this.hasError = true;
    }else if(typeof(serviceCenter.address) == "undefined"){
      this.errorMessage="Service center address not entered";
      this.hasError = true;
    }
    else if(typeof(serviceCenter.tele) == "undefined"){
      this.errorMessage="Service center telephone number not entered";
      this.hasError = true;
    }
    else{

    this.serviceListRef$.push({
      name: this.serviceCenter.name,
      address: this.serviceCenter.address,
      tele: Number(this.serviceCenter.tele)
    });
    this.presentAlert();
  }

    // Reset our ShoppingItem
    this.serviceCenter = {} as ServiceCenter;

    // Navigate the user back to the ShoppingListPage
    //this.navCtrl.push('RecordsAddPage');
    //this.navCtrl.pop();
  
}
presentAlert(){
  const alert = this.alertCtrl.create({
    title: 'Record added!',
    subTitle: `New service center  added to database`,
   buttons: ['Okay']
  });
  alert.onDidDismiss(() => console.log('Alert was dismissed by the user'));
  alert.present();
}
  
}
