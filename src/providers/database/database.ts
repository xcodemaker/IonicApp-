import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import PouchDB from 'pouchdb';
// import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  public pdb; 
  public employees;

  constructor() {
    console.log('Hello DatabaseProvider Provider');
  }


}
