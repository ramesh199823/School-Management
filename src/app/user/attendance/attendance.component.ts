import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  studentDetails: any;
  id: any
  details: any;
  value : any;
  currentDate : any
  colorChange:any
  StdDetais: any
  show = true
  constructor(private authService: AuthService ,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.details =  JSON.parse(localStorage.getItem('user') || '{}' )
    this.id = this.details.userId
    this.currentDate = new Date()
    // if(localStorage.getItem('todayDate' || '{}') === moment(this.currentDate).format('DD-MMM-yyyy')){
    //   this.show = false
    // }
    this.authService.todayAttendanceDetails(this.id, moment(this.currentDate).format('DD-MMM-yyyy')).subscribe((res:any)=>{
      if(res.body.length){
        this.show = false
      }
    })
    this.getStudents();
  }
  getStudents(){
    this.authService.getAllStudentDetails(this.id).subscribe((res:any)=>{
      if(res && res.message === 'Success'){
          this.studentDetails = res.body  
          this.studentDetails.forEach((element:any) => {
            element.presentStatus = 'White'
          });
        }    
    })
    
  }
  submit(){
    this.StdDetais = [];
    this.studentDetails.forEach((student:any) => {
      let data= {
        userName : student.userName,
        rollNumber: student.rollNumber,
        attendanceDetails: student.presentStatus,
        userId: student.userId,
        date : moment(this.currentDate).format('DD-MMM-yyyy')
      }
      this.StdDetais.push(data)
    });
    this.authService.addAttendanceDetails(this.StdDetais).subscribe((res:any)=>{
      this.toaster.success("Studend Updated Successfully!", res.message)
      // localStorage.setItem('todayDate', moment(this.currentDate).format('DD-MMM-yyyy'))
   })
 }
}
