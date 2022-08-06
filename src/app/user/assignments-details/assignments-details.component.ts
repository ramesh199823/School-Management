import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-assignments-details',
  templateUrl: './assignments-details.component.html',
  styleUrls: ['./assignments-details.component.scss']
})
export class AssignmentsDetailsComponent implements OnInit {
  students:any =[]
  selectedSubject:any
  details:any
  id:any
  constructor(private authService:AuthService, private toaster: ToastrService) { }

  ngOnInit() {
    this.details =  JSON.parse(localStorage.getItem('user') || '{}' )
    this.id = this.details.userId
    this.selectedSubject = 'Tamil'
    this.getAssignmentBySubject(this.selectedSubject)
  }
  getAssignmentBySubject(subject:any){
    this.authService.getAssignmentBySubject(subject,this.id).subscribe((res:any)=>{
      console.log("Assignment",res)
      this.students = res.body
    })
  }
  selected(){
    this.getAssignmentBySubject(this.selectedSubject)
  }
  download(student:any){
  console.log(student.rollNumber)
  this.authService.getAssignments(student.rollNumber, this.selectedSubject).subscribe((res:any)=>{
     if(res.message=="Success"){
         const downloadLink = document.createElement("a");
         const fileName = `${student.rollNumber}${this.selectedSubject}.pdf`;
         downloadLink.href = res.body[0].pdfData;
         downloadLink.download = fileName;
         downloadLink.click();
         this.toaster.success('Download successfully', res.message)
    }
  })
 }
}
