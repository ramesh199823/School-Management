import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.scss']
})
export class AttendanceDetailsComponent implements OnInit {
  dates:any
  studentDetails: any;
  details: any;
  id: any;
  attendanceDetails:any
  values: any = []
  present : any = [];
  selectedMonth:any;
  registerMonths:any = []
  endValue:any
  currentDate: any
  monthCheck: any
  weekNames: any
  weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  yearCheck: any;
  selectedYear = '2022'
  years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022']
  constructor(private authService: AuthService, private activatedRouter:ActivatedRoute ) { }

  ngOnInit(): void {
  this.currentDate = new Date()
  this.activatedRouter.data.subscribe((res:any)=>{
    console.log("Resolver Value",res)
    this.studentDetails = res.student.body
  })
  this.monthCheck=moment(this.currentDate).format('DD-MMM-yyyy').split('-')[1]
  this.selectedMonth = this.monthCheck
  this.yearCheck =parseInt(moment(this.currentDate).format('DD-MMM-yyyy').split('-')[2])
  this.details =  JSON.parse(localStorage.getItem('user') || '{}' )
  this.id = this.details.userId
  this.dateChange()
  // this.getStudents();
  this.getAttendanceDetails();
  }
//   getStudents(){
//     this.authService.getAllStudentDetails(this.id).subscribe((res:any)=>{
//       if(res && res.message === 'Success'){
//           this.studentDetails = res.body  
//       }    
//     })
// }
dateChange(){
  if(this.selectedMonth == 'Jan' || this.selectedMonth == 'Mar' || this.selectedMonth == 'May' || this.selectedMonth == 'Jul' || this.selectedMonth == 'Aug' || this.selectedMonth == 'Oct' || this.selectedMonth == 'Dec'){
    this.endValue=31
  }else if(this.selectedMonth == 'Apr' || this.selectedMonth == 'Jun' || this.selectedMonth == 'Sep' || this.selectedMonth == 'Nov' ){
    this.endValue=30
  }else if(this.selectedMonth == 'Feb' &&(parseInt(this.selectedYear) % 4 == 0)){
    this.endValue = 29
  } else{
    this.endValue = 28
  }
  this.dates=[]
  this.weekNames = []
  for(let i =1; i<= this.endValue; i++){
    this.dates.push(i);
    this.weekNames.push(this.weekday[new Date(`${this.selectedMonth}-${i}-${this.selectedYear}`).getDay()]);
  }
}
getAttendanceDetails(){
  this.authService.getAttendance(this.id).subscribe((res:any)=>{
    if(res && res.message === 'Success'){
    this.attendanceDetails = res.body
    let check = this.attendanceDetails[0].rollNumber
    let checkArray = []
    checkArray = this.attendanceDetails.filter((x:any)=> x.rollNumber === check)
    if(checkArray){
      checkArray.forEach((element:any) => {
        let date =element.date
        let split =parseInt(date.split('-')[0]) + "-"+date.split('-')[1]
        let month = date.split('-')[1]
        if(!this.registerMonths.includes(month)){
          this.registerMonths.push(month)
        }
        this.values.push(split)
      });
      console.log(this.values,"values")
    }
    if(this.studentDetails.length){
    this.studentDetails.forEach((res:any)=>{
       let rollNumberCheck = res.rollNumber
       this.present = []
       this.attendanceDetails.filter((x:any)=> {
         if(x.rollNumber === rollNumberCheck){
             this.present.push(x.attendanceDetails)
         }
        })
        res.presentArray = this.present
    })
  }
    }
  })
}
}
