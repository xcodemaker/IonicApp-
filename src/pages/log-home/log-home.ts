import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecordsAddPage } from '../records-add/records-add';
import {GiveAwaysPage} from '../give-aways/give-aways';
import {RecieveFromPage} from '../recieve-from/recieve-from';
import {ReportPage} from '../report/report';

/**
 * Generated class for the LogHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-home',
  templateUrl: 'log-home.html',
})
export class LogHomePage {
  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.initializeItems();
  }
  
  navigateToAddRecords(){
    this.navCtrl.push('RecordsAddPage');
 }

 navigateToGiveAways(){
  this.navCtrl.push('GiveAwaysPage');
}

navigateToRecieveFrom(){
  this.navCtrl.push('RecieveFromPage');
}
navigateToReport(){
  this.navCtrl.push('ReportPage');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogHomePage');
  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
