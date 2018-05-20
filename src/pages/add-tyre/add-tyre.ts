import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';

/**
 * Generated class for the AddTyrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-tyre',
  templateUrl: 'add-tyre.html',
})
export class AddTyrePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTyrePage');
  }

  

}
