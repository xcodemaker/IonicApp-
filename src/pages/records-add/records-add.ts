import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import {AddTyrePage} from '../add-tyre/add-tyre';
import {EditRemoveTyrePage} from '../edit-remove-tyre/edit-remove-tyre';
import {AddServiceCenterPage} from '../add-service-center/add-service-center';
import {EditRemoveServiceCenterPage} from '../edit-remove-service-center/edit-remove-service-center';

/**
 * Generated class for the RecordsAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-records-add',
  templateUrl: 'records-add.html',
})
export class RecordsAddPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;

  SwipedTabsIndicator :any= null;
  tabs:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabs=["Tyres","Service Center"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordsAddPage');
  }
  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
  }

  selectTab(index) {    
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
      // this condition is to avoid passing to incorrect index
  	if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
  	{
  		this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
  	}
    
    }

  animateIndicator($event) {
  	if(this.SwipedTabsIndicator)
   	    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
  }
  navigateToAddTyre(){
    this.navCtrl.push('AddTyrePage');
 }
 navigateToEditRemoveTyre(){
  this.navCtrl.push('EditRemoveTyrePage');
 }
 navigateToAddServiceCenter(){
  this.navCtrl.push('AddServiceCenterPage');
 }
 navigateToEdiitRemoveServiceCenter(){
  this.navCtrl.push('EditRemoveServiceCenterPage');
 }

}
