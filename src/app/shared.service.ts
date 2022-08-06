import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  items:any =[]
  allPassedData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  constructor() { }
  addData(value: any){
    this.items.push(value);
    console.log(this.items)
  }
  getData(){
    return this.items
  }
}
