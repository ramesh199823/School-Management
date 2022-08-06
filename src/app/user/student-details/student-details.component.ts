import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  details:any
  show =false
  id:any
  studentDetails:any
  editStudentData: any 
  totalCount = 0;
  currentPage = 1;
  limit = 10
  itemsPerPage = 10
  addressSplits:any
  skip = 0
  searchQuery = new Subject<string>()
  userQuestion =""
  constructor(private authService: AuthService,private router:Router, private toaster: ToastrService, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.details =  JSON.parse(localStorage.getItem('user') || '{}' )
    this.id = this.details.userId
    this.getStudents(this.limit, this.skip)
    this.searchQuery.pipe(debounceTime(1000),
    distinctUntilChanged()).subscribe((searchValue:any)=>{
      this.getStudents(this.limit, this.skip, searchValue)
    })
    this.getStudentsCount()
    }
  getStudents(limit?:any, skip?:any, searchValue?:any ){
    this.authService.getStudentDetails(this.id, limit , skip, searchValue).subscribe((res:any)=>{
      if(res && res.message === 'Success'){
          this.studentDetails = res.body  
      }    
    })
  }
  addressDetails(address?:any){
    this.show = ! this.show
    if(this.show){
    this.addressSplits = address.split(',')
    }
  }
  pageLimitChange(){
     this.limit = this.itemsPerPage;
     this.pageChange(this.currentPage);
  }
 
  pageChange(event?:any){
    this.currentPage = event
    this.skip = (this.currentPage-1) * this.limit
    this.getStudents(this.limit, this.skip)
    this.getStudentsCount()
  }
  getStudentsCount(){
    this.authService.studentCount(this.id).subscribe((res:any)=>{
      this.totalCount = res.body
    })
  }
  delete(i:number){
   const data = this.studentDetails.splice(i , 1)
   const deletedId= data[0]._id
   this.authService.deleteStudent(deletedId).subscribe((res)=>{
     this.authService.deleteStudentAttendace(data[0].rollNumber).subscribe((res:any)=>{ 
      this.getStudents(this.limit, this.skip)
      this.getStudentsCount()
     })
   })
  }
  edit(student: any){
    this.editStudentData = [];
    const split =student.dob.split('-')
    const model = {
      day : parseInt(split[0]),
      month: parseInt(split[1]),
      year: parseInt(split[2])
    }
    student.dob = model
    this.editStudentData.push(student)
    this.sharedService.allPassedData.next(this.editStudentData)
  }

}
