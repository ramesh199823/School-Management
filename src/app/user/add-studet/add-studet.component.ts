import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-studet',
  templateUrl: './add-studet.component.html',
  styleUrls: ['./add-studet.component.scss']
})
export class AddStudetComponent implements OnInit {
  firstName = '';
  lastName = '';
  email ='';
  phoneNumber = '';
  address = '';
  StreetLine1 =''
  City =''
  District = ''
  Pincode = ''
  State = ''
  gender = '';
  rollNumber = ''
  model: NgbDateStruct | undefined;
  seletedGender = ''
  date!: { year: number; month: number; };
  user: any;
  value = 1;
  id:any
  newImg:any
  userName: any
  addImage: any
  formData = new FormData()
  constructor(private router:Router, private authService: AuthService,private toaster: ToastrService,private sharedService:SharedService) { }

  ngOnInit(): void {
    this.sharedService.allPassedData.subscribe((res:any)=>{
      if(res.length){
        this.firstName =  res[0].userName.split('  ')[0];
        this.lastName =  res[0].userName.split('  ')[1];
        this.email = res[0].email;
        this.phoneNumber =  res[0].phoneNumber;
        this.address =  res[0].address;
        this.rollNumber =  res[0].rollNumber
        this.model =res[0].dob
        this.seletedGender = res[0].gender
        this.value =2;
        this.id = res[0]._id
      }
    })
    this.user = JSON.parse(localStorage.getItem('user') || '{}' )
    this.addImage = "assets/img/user.png"
  }
  fileChange(e:any){
    const reader = new FileReader
    reader.readAsDataURL(e.target.files[0]);
    this.newImg = e.target.files[0]
    this.formData.append('profilePhoto', this.newImg, this.newImg.name)
    reader.onload = (e:any)=>{
      this.addImage = e.target.result   
    }
  }
  submit(){
    if(this.lastName == undefined){
      this.userName = this.firstName
    }else{
      this.userName = this.firstName + " "+ this.lastName
    }
    this.address = this.StreetLine1+","+ this.City +","+this.District+","+this.Pincode+","+this.State
     let data ={
       userName: this.userName ,
       email: this.email,
       phoneNumber:parseInt(this.phoneNumber),
       address: this.address,
       gender: this.seletedGender,
       rollNumber: this.rollNumber,
       dob : `${this.model?.day}-${this.model?.month}-${this.model?.year}`,
       userId : this.user.userId,
       image : this.formData
     } 
     console.log("data", data)
     if(this.value == 1){
     this.authService.addStudentDetails(data).subscribe((res: any)=>{
       if(res.message =="Success"){
        this.toaster.success("Studend Added Successfully!", res.message)
        this.authService.getAttendance(this.user.userId).subscribe((res:any)=>{
          let attendanceDetails = res.body
          let dateAdd:any = [];
          let x = attendanceDetails[0].rollNumber
          let result= attendanceDetails.filter((ele:any)=> ele.rollNumber == x)
          result.forEach((element:any)=>{
            dateAdd.push(element.date)
          })
          let y = result.length
          for( let i =0; i< y-1; i++){
            let data = {
              userName :this.userName,
              rollNumber:this.rollNumber,
              attendanceDetails: 'White',
              userId: this.user.userId,
              date : dateAdd[i]
            }
            this.authService.addNewAttendanceDetails(data).subscribe((res:any)=>{
            })
          }
          let data = {
            userName :this.userName,
            rollNumber:this.rollNumber,
            attendanceDetails: 'present',
            userId: this.user.userId,
            date : moment(new Date()).format('DD-MMM-yyyy')
          }
          this.authService.addNewAttendanceDetails(data).subscribe((res:any)=>{
          })
        })
       }
       this.router.navigate(['user/studentDetails'])
     })
    }else if(this.value == 2){
      this.authService.updateStudentDetails(data, this.id).subscribe((res:any)=>{
        if(res.message =="Success"){
          this.toaster.success("Studend Updated Successfully!", res.message)
          let value ={
            userName :this.userName,
            rollNumber:this.rollNumber,
          }
          this.authService.updateAttendanceDetails(value, this.rollNumber).subscribe((res:any)=>{
          })
         }
      })
    }
  }
}
