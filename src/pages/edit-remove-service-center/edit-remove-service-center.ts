import { ServiceCenter } from './../../models/service-center/service-center.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs';
//import { ServiceCenter } from '../../models/service-center/service-center.interface';
import { FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the EditRemoveServiceCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-remove-service-center',
  templateUrl: 'edit-remove-service-center.html',
})
export class EditRemoveServiceCenterPage {

  serviceItemSubscription: Subscription;
  serviceItemRef$: FirebaseObjectObservable<ServiceCenter>;
  //shoppingItem = {} as ShoppingItem;
  searchQuery: string = '';
  items: string[];
  x :string[];
  

  hasError: boolean;
  errorMessage: string;
  serviceCenter = {} as ServiceCenter;

  serviceListRef$: FirebaseListObservable<ServiceCenter[]>
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  search: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,public alertCtrl: AlertController) {
    
    this.serviceListRef$ = this.database.list('service-center');
    let data=[];
    let tyreNumber;
    let $key;
    let tyre;
    //console.log(this.tyreListRef$);
    this.serviceListRef$.forEach(element => {
      //console.log(element);
      for(let i=0;i<element.length;i++){
        data.push({
          name: element[i].name
        
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
    this.serviceListRef$.forEach(element => {
      //console.log(element);
      for(let i=0;i<element.length;i++){
        if(element[i].name==val){
        key=element[i].$key;
        }
        
       }
      
      //x=element.length
      console.log('key :'+key);
  });

    //let id = ev.target.id;
console.log("value set : "+key);
this.serviceItemRef$ = this.database.object(`service-center/${key}`);

this.serviceItemSubscription =
      this.serviceItemRef$.subscribe(
        serviceCenter => this.serviceCenter = serviceCenter);
  }

    // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //   this.items = this.items.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
    updateServiceCenter(serviceCenter: ServiceCenter) {

      if (typeof(serviceCenter.name) == "undefined"){
        this.errorMessage="Service center name not entered";
        this.hasError = true;
    }else if(typeof(serviceCenter.address) == "undefined"){
      this.errorMessage="Service center address not entered";
      this.hasError = true;
    }
    else if(typeof(serviceCenter.tele) == "undefined"){
      this.errorMessage="Service center telephone number not entered";
      this.hasError = true;
    }
      else{
  
      this.serviceItemRef$.update({
        name: this.serviceCenter.name,
        address: this.serviceCenter.address,
        tele: Number(this.serviceCenter.tele)
      });
      this.presentAlert("edited");
    }

    //this.navCtrl.pop();
  }
  removeServiceCenter(){
    this.serviceItemRef$.remove();
    this.presentAlert("removed");
  }

  presentAlert(msg:any){
    const alert = this.alertCtrl.create({
      title: 'Record added!',
      subTitle: `Service center details  ${msg}`,
     buttons: ['Okay']
    });
    alert.onDidDismiss(() => console.log('Alert was dismissed by the user'));
    alert.present();
  }

}
