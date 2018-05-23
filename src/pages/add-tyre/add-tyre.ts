import { RecordsAddPage } from './../records-add/records-add';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
//import {RecordsAddPage} from '../records-add/records-add';

import {TyreList} from '../../models/tyre-list/tyre-list.interface';
import { DataProvider } from '../../providers/data/data';
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
  hasError: boolean;
  errorMessage: string;
  tyreList = {} as TyreList;

  tyreListRef$: FirebaseListObservable<TyreList[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DataProvider) {
    this.tyreListRef$ = this.database.list('tyre-list');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTyrePage');
  }
  addTyreList(tyreList: TyreList) {
    //this.tyreListRef$ = this.database.list(`tyre-list/${this.tyreList.tyreNumber}`);

    if (typeof(tyreList.tyreNumber) == "undefined"){
        this.errorMessage="Tyre number not entered";
        this.hasError = true;
    }else if(typeof(tyreList.tyreHouse) == "undefined"){
      this.errorMessage="Tyre house not entered";
      this.hasError = true;
    }
    else if(typeof(tyreList.tyrePrice) == "undefined"){
      this.errorMessage="Tyre price not entered";
      this.hasError = true;
    }
    else if(typeof(tyreList.purchesDate) == "undefined"){
      this.errorMessage="Tyre purches date not entered";
      this.hasError = true;
    }
    else{

    this.tyreListRef$.push({
      tyreNumber: this.tyreList.tyreNumber,
      tyreHouse: this.tyreList.tyreHouse,
      purchesDate:this.tyreList.purchesDate,
      tyrePrice: Number(this.tyreList.tyrePrice)
    });
  }

    // Reset our ShoppingItem
    this.tyreList = {} as TyreList;

    // Navigate the user back to the ShoppingListPage
    //this.navCtrl.push('RecordsAddPage');
    //this.navCtrl.pop();
  
}
  

}
