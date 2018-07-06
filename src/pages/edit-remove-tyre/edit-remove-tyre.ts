import { ServiceCenter } from './../../models/service-center/service-center.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  tyres: string[];
  x :string[];
  

  hasError: boolean;
  errorMessage: string;
  tyreList = {} as TyreList;

  tyreListRef$: FirebaseListObservable<TyreList[]>;
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
  
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRemoveTyrePage');
  }

  setItems(ev: any) {
    let data=[];
    let key;
    let val = ev.target.value;
    this.tyreListRef$.forEach(element => {
      //console.log(element);
      for(let i=0;i<element.length;i++){
        if(element[i].tyreNumber==val){
        key=element[i].$key;
        }
        
       }
      console.log('key :'+key);
  });
console.log("value set : "+key);
this.tyreItemRef$ = this.database.object(`tyre-list/${key}`);

this.tyreItemSubscription =
      this.tyreItemRef$.subscribe(
        tyreList => this.tyreList = tyreList);
  }
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

      this.presentAlert("edited");
    }

    //this.navCtrl.pop();
  }
  removeTyreList(){
    this.tyreItemRef$.remove();
    this.presentAlert("removed");
  }
  ionViewWillLeave() {
    // Unsubscribe from the Observable when leaving the page
    //this.tyreItemSubscription.unsubscribe();
  }
  presentAlert(msg:any){
    const alert = this.alertCtrl.create({
      title: 'Record added!',
      subTitle: `Tyre details  ${msg}`,
     buttons: ['Okay']
    });
    alert.onDidDismiss(() => console.log('Alert was dismissed by the user'));
    alert.present();
  }
}
