import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceResolverService implements Resolve<any>{
  show:any
  id =JSON.parse(localStorage.getItem('user') || '{}')
  date =moment(new Date()).format('DD-MMM-yyyy')
  constructor( private authService: AuthService) { }
  resolve(route: ActivatedRouteSnapshot):Boolean {
    this.authService.todayAttendanceDetails(this.id.userId, this.date).subscribe((res:any)=>{
      if(res.message == 'Success' && res.body.length){
         this.show = true
      }else{
         this.show = false
      }
    })
    return this.show
  }
}
