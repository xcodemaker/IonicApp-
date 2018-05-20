import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl} from '@angular/forms';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddServiceCenterPage');
  }
  
}
