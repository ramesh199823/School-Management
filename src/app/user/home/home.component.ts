import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  studentCount: any
  id : any
  date:any
  presentPercentage: any
  constructor(private authService: AuthService) { }
   
  ngOnInit(): void {
  let user = JSON.parse(localStorage.getItem('user') || '{}' )
  this.id = user.userId
  this.date = moment(new Date()).format('DD-MMM-yyyy')
   this.getStudentsCount()
  }
  getStudentsCount(){
    this.authService.studentCount(this.id).subscribe((res:any)=>{
      this.studentCount = res.body
      this.authService.todayAttendanceDetails(this.id, this.date).subscribe((res:any)=>{
        let attendanceDetails = res.body;
        attendanceDetails = attendanceDetails.filter((x:any)=> x.attendanceDetails == 'present')
        this.presentPercentage = Math.round((attendanceDetails.length /this.studentCount) * 100);
      })
    })
  }

}
