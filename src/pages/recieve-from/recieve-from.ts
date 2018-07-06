import { RecieveFrom } from './../../models/recieve-from/recieve-from.interface';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { TyreList } from '../../models/tyre-list/tyre-list.interface';
import { ServiceCenter } from '../../models/service-center/service-center.interface';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { GiveAways } from '../../models/give-aways/give-aways.interface';

/**
 * Generated class for the RecieveFromPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recieve-from',
  templateUrl: 'recieve-from.html',
})
export class RecieveFromPage {
  giveAwaysSubscription: Subscription;
  giveAwaysItemRef$: FirebaseObjectObservable<GiveAways>;
  //ItemRef$: FirebaseObjectObservable<GiveAways>;
  //shoppingItem = {} as ShoppingItem;
  searchQuery: string = '';
  items: string[];
  tyres: string[];
  x :string[];
  

  hasError: boolean;
  errorMessage: string;
  tyreList = {} as TyreList;
  giveAways = {} as any;
  recieveFrom={} as RecieveFrom;

  tyreListRef$: FirebaseListObservable<GiveAways[]>;
  recieveListRef$: FirebaseListObservable<RecieveFrom[]>;
  giveAwaysRef$: FirebaseListObservable<GiveAways[]>;
  serviceCenterRef$: FirebaseListObservable<ServiceCenter[]>
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  search: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DataProvider,public alertCtrl: AlertController) {
    
    this.tyreListRef$ = this.database.list('give-aways');
    this.giveAwaysRef$ = this.database.list('give-aways');
    this.recieveListRef$ = this.database.list('recieve-from');
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

       this.items =data;
        console.log(data);
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
    this.giveAwaysRef$.forEach(element => {
      //console.log(element);
      for(let i=0;i<element.length;i++){
        if(element[i].tyreNumber==val){
        key=element[i].$key;
        }
        
       }
      console.log('key :'+key);
  });
console.log("value set : "+key);
this.giveAwaysItemRef$ = this.database.object(`give-aways/${key}`);

this.giveAwaysSubscription =
      this.giveAwaysItemRef$.subscribe(
        giveAways => this.giveAways = giveAways);
  }
  addRecieveList(giveAways: any) {
    //this.tyreListRef$ = this.database.list(`tyre-list/${this.tyreList.tyreNumber}`);

    if (typeof(giveAways.tyreNumber) == "undefined"){
        this.errorMessage="Tyre number not entered";
        this.hasError = true;
    }else if(typeof(giveAways.tyreHouse) == "undefined"){
      this.errorMessage="Tyre house not entered";
      this.hasError = true;
    }
    else if(typeof(giveAways.giveDate) == "undefined"){
      this.errorMessage="Tyre price not entered";
      this.hasError = true;
    }
    else if(typeof(giveAways.recieveDate) == "undefined"){
      this.errorMessage="Tyre purches date not entered";
      this.hasError = true;
    }
    else if(typeof(giveAways.billAmount) == "undefined"){
      this.errorMessage="Tyre purches date not entered";
      this.hasError = true;
    }
    else{

    this.recieveListRef$.push({
      tyreNumber: this.giveAways.tyreNumber,
      tyreHouse: this.giveAways.tyreHouse,
      giveDate:this.giveAways.giveDate,
      recieveDate:this.giveAways.recieveDate,
      billAmount:Number(this.giveAways.billAmount)
    });
    this.giveAwaysItemRef$.remove();
    this.presentAlert("added");
  }

    // Reset our ShoppingItem
    this.giveAways = {} as any;

    // Navigate the user back to the ShoppingListPage
    //this.navCtrl.push('RecordsAddPage');
    //this.navCtrl.pop();
  
}
  ionViewWillLeave() {
    // Unsubscribe from the Observable when leaving the page
    //this.tyreItemSubscription.unsubscribe();
  }
  presentAlert(msg:any){
    const alert = this.alertCtrl.create({
      title: 'Record added!',
      subTitle: `Recieve details  ${msg}`,
     buttons: ['Okay']
    });
    alert.onDidDismiss(() => console.log('Alert was dismissed by the user'));
    alert.present();
  }
}
