import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BusList } from '../../models/bus-list/bus-list.interface';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the AddBusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-bus',
  templateUrl: 'add-bus.html',
})
export class AddBusPage {

  hasError: boolean;
  errorMessage: string;
  busList = {} as BusList;

  busListRef$: FirebaseListObservable<BusList[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DataProvider,public alertCtrl: AlertController) {
    this.busListRef$ = this.database.list('bus-list');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddServiceCenterPage');
  }
  addBus(busList: BusList) {
    //this.tyreListRef$ = this.database.list(`tyre-list/${this.tyreList.tyreNumber}`);

    if (typeof(busList.busNumber) == "undefined"){
        this.errorMessage="Bus number not entered";
        this.hasError = true;
    }
    else{

    this.busListRef$.push({
      busNumber: this.busList.busNumber
    });
    this.presentAlert(this.busList.busNumber);
  }
  

    // Reset our ShoppingItem
    this.busList = {} as BusList;

    // Navigate the user back to the ShoppingListPage
    //this.navCtrl.push('RecordsAddPage');
    //this.navCtrl.pop();
  
}
presentAlert(val:any){
  const alert = this.alertCtrl.create({
    title: 'Record added!',
    subTitle: `${val} bus added to database`,
   buttons: ['Okay']
  });
  alert.onDidDismiss(() => console.log('Alert was dismissed by the user'));
  alert.present();
}

}
