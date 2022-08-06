import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor() { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    const value =JSON.parse(localStorage.getItem('user') || '{}' )
    let show:boolean
    if(value.email == undefined){
     show = false
     }else{
       show = true
     }
     return show
  }
}
