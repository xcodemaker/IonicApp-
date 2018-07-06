import { BusList } from './../../models/bus-list/bus-list.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//import { BusList } from '../../models/bus-list/bus-list.interface';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Subscription } from 'rxjs';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the EditRemoveBusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-remove-bus',
  templateUrl: 'edit-remove-bus.html',
})
export class EditRemoveBusPage {
  busItemSubscription: Subscription;
  busItemRef$: FirebaseObjectObservable<BusList>;
  //shoppingItem = {} as ShoppingItem;
  searchQuery: string = '';
  items: string[];
  x :string[];
  

  hasError: boolean;
  errorMessage: string;
  busList = {} as BusList;

  busListRef$: FirebaseListObservable<BusList[]>
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  search: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DataProvider,public alertCtrl: AlertController) {
    
    this.busListRef$ = this.database.list('bus-list');
    let data=[];
    let busNumber;
    let $key;
    let bus;
    //console.log(this.tyreListRef$);
    this.busListRef$.forEach(element => {
      //console.log(element);
      for(let i=0;i<element.length;i++){
        data.push({busNumber:element[i].busNumber});     
        
       }

      this.items =data;
  });
  // console.log(element);
  
  
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRemoveTyrePage');
  }

  setItems(ev: any) {
    let data=[];
    let key;
    let val = ev.target.value;
    this.busListRef$.forEach(element => {
      //console.log(element);
      for(let i=0;i<element.length;i++){
        if(element[i].busNumber==val){
        key=element[i].$key;
        }
        
       }
      console.log('key :'+key);
  });
console.log("value set : "+key);
this.busItemRef$ = this.database.object(`bus-list/${key}`);

this.busItemSubscription =
      this.busItemRef$.subscribe(
        busList => this.busList = busList);
  }
    updateBusList(busList: BusList) {

      if (typeof(busList.busNumber) == "undefined"){
          this.errorMessage="Bus number not entered";
          this.hasError = true;
      }
      else{
  
      this.busItemRef$.update({
        busNumber: this.busList.busNumber
      });

      this.presentAlert("edited");
    }

    //this.navCtrl.pop();
  }
  removeBusList(){
    this.busItemRef$.remove();
    this.presentAlert("removed");
  }
  ionViewWillLeave() {
    // Unsubscribe from the Observable when leaving the page
   // this.busItemSubscription.unsubscribe();
  }
  presentAlert(msg:any){
    const alert = this.alertCtrl.create({
      title: 'Record added!',
      subTitle: `Bus details  ${msg}`,
     buttons: ['Okay']
    });
    alert.onDidDismiss(() => console.log('Alert was dismissed by the user'));
    alert.present();
  }
}
