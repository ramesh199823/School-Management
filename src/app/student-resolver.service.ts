import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentResolverService implements Resolve<any>{
   id =JSON.parse(localStorage.getItem('user') || '{}')
  constructor(private authService:AuthService) { }
  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    return this.authService.getAllStudentDetails(this.id.userId).pipe(catchError(err=>{ return 'No data'}))
  }
}
