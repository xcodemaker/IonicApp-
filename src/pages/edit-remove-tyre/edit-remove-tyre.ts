import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TyreList } from '../../models/tyre-list/tyre-list.interface';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { DataProvider } from '../../providers/data/data';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { Subscription } from 'rxjs';

/**
 * Generated class for the EditRemoveTyrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-remove-tyre',
  templateUrl: 'edit-remove-tyre.html',
})
export class EditRemoveTyrePage {
  tyreItemSubscription: Subscription;
  tyreItemRef$: FirebaseObjectObservable<TyreList>;
  //shoppingItem = {} as ShoppingItem;
  searchQuery: string = '';
  items: string[];
  x :string[];
  

  hasError: boolean;
  errorMessage: string;
  tyreList = {} as TyreList;

  tyreListRef$: FirebaseListObservable<TyreList[]>
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  search: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase) {
    
    this.tyreListRef$ = this.database.list('tyre-list');
    let data=[];
    let tyreNumber;
    let $key;
    let tyre;
    //console.log(this.tyreListRef$);
    this.tyreListRef$.forEach(element => {
      //console.log(element);
      for(let i=0;i<element.length;i++){
        data.push({
          tyreNumber: {
            tyre:element[i].tyreNumber,
            $key:element[i].$key
          }
        
        });     
        
       }
      //x=element.length
      //console.log('data :'+JSON.stringify(data));
      //this.initializeItems(data);
      this.items =data;
  });
  // console.log(element);
  
  
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRemoveTyrePage');
  }

  // initializeItems() {
  //   this.items =this.x;
  //   console.log('items init :'+this.items);
  // }

  setItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();
    let data=[];
    let key;
    // set val to the value of the searchbar
    let val = ev.target.value;
    this.tyreListRef$.forEach(element => {
      //console.log(element);
      for(let i=0;i<element.length;i++){
        if(element[i].tyreNumber==val){
        key=element[i].$key;
        }
        
       }
      
      //x=element.length
      console.log('key :'+key);
  });

    //let id = ev.target.id;
console.log("value set : "+key);
this.tyreItemRef$ = this.database.object(`tyre-list/${key}`);

this.tyreItemSubscription =
      this.tyreItemRef$.subscribe(
        tyreList => this.tyreList = tyreList);
  }

    // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //   this.items = this.items.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
    updateTyreList(tyreList: TyreList) {

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
  
      this.tyreItemRef$.update({
        tyreNumber: this.tyreList.tyreNumber,
        tyreHouse: this.tyreList.tyreHouse,
        purchesDate:this.tyreList.purchesDate,
        tyrePrice: Number(this.tyreList.tyrePrice)
      });
    }

    //this.navCtrl.pop();
  }
  removeTyreList(){
    this.tyreItemRef$.remove();
  }
  ionViewWillLeave() {
    // Unsubscribe from the Observable when leaving the page
    this.tyreItemSubscription.unsubscribe();
  }
}
