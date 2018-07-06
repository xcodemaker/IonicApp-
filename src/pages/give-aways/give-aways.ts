import { GiveAways } from './../../models/give-aways/give-aways.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TyreList } from '../../models/tyre-list/tyre-list.interface';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Subscription } from 'rxjs';
import { ServiceCenter } from '../../models/service-center/service-center.interface';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the GiveAwaysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-give-aways',
  templateUrl: 'give-aways.html',
})
export class GiveAwaysPage {

  tyreItemSubscription: Subscription;
  tyreItemRef$: FirebaseObjectObservable<TyreList>;
  //shoppingItem = {} as ShoppingItem;
  searchQuery: string = '';
  items: string[];
  tyres: string[];
  x :string[];
  

  hasError: boolean;
  errorMessage: string;
  giveAways = {} as GiveAways;

  tyreListRef$: FirebaseListObservable<TyreList[]>;
  giveAwaysRef$: FirebaseListObservable<GiveAways[]>;
  serviceCenterRef$: FirebaseListObservable<ServiceCenter[]>
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  search: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DataProvider,public alertCtrl: AlertController) {

    
    
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

       this.items =data;
        console.log(data);
  });
  // console.log(element);
 
  this.serviceCenterRef$=this.database.list('service-center');

let datas=[];
this.serviceCenterRef$.forEach(element => {
  console.log(element);
  for(let i=0;i<element.length;i++){
    datas.push({
        name:element[i].name
    });     
    
   }

  this.tyres =datas;
  // console.log(data);
});
this.giveAwaysRef$ = this.database.list('give-aways');
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRemoveTyrePage');
  }

//   setItems(ev: any) {
//     let data=[];
//     let key;
//     let val = ev.target.value;
//     this.tyreListRef$.forEach(element => {
//       //console.log(element);
//       for(let i=0;i<element.length;i++){
//         if(element[i].tyreNumber==val){
//         key=element[i].$key;
//         }
        
//        }
//       console.log('key :'+key);
//   });
// console.log("value set : "+key);
// this.tyreItemRef$ = this.database.object(`tyre-list/${key}`);

// this.tyreItemSubscription =
//       this.tyreItemRef$.subscribe(
//         tyreList => this.tyreList = tyreList);
//   }
  addGiveAways(giveAways: GiveAways) {
    //this.tyreListRef$ = this.database.list(`tyre-list/${this.tyreList.tyreNumber}`);

    if (typeof(giveAways.tyreNumber) == "undefined"){
        this.errorMessage="Tyre number not entered";
        this.hasError = true;
    }else if(typeof(giveAways.tyreHouse) == "undefined"){
      this.errorMessage="Tyre house not entered";
      this.hasError = true;
    }
    else if(typeof(giveAways.giveDate) == "undefined"){
      this.errorMessage="Tyre give date not entered";
      this.hasError = true;
    }
    else if(typeof(giveAways.reason) == "undefined"){
      this.errorMessage="Tyre give reason not entered";
      this.hasError = true;
    }
    else{

    this.giveAwaysRef$.push({
      tyreNumber: this.giveAways.tyreNumber,
      tyreHouse: this.giveAways.tyreHouse,
      giveDate:this.giveAways.giveDate,
      reason:this.giveAways.reason
    });

    this.presentAlert("added");
  }
  this. giveAways = {} as GiveAways;
}
  // removeTyreList(){
  //   this.tyreItemRef$.remove();
  //   this.presentAlert("removed");
  // }
  ionViewWillLeave() {
    // Unsubscribe from the Observable when leaving the page
    //this.tyreItemSubscription.unsubscribe();
  }
  presentAlert(msg:any){
    const alert = this.alertCtrl.create({
      title: 'Record added!',
      subTitle: `Give away details  ${msg}`,
     buttons: ['Okay']
    });
    alert.onDidDismiss(() => console.log('Alert was dismissed by the user'));
    alert.present();
  }
}
