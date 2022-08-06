import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
   studentDetails:any
   details:any
   id:any
   pdfSrc:any
   SelectedSubject:any = []
  subjects = ['Tamil', 'English', 'Maths', 'Science', 'Social']
  constructor(private authService: AuthService, private toaster:ToastrService) { }
  
  ngOnInit(): void {
  this.details =  JSON.parse(localStorage.getItem('user') || '{}' )
  this.id = this.details.userId
   this.getStudents()
  }
   getStudents(){
    this.authService.getAllStudentDetails(this.id).subscribe((res:any)=>{
      if(res && res.message === 'Success'){
          this.studentDetails = res.body  
          this.studentDetails.forEach((element:any) => {
            element.fileName = "No file Choosen"
            element.pdfSrc = ''
          });
      }    
    })
}
fileChange(student:any,e:any){
  console.log(e.target.files[0].name)
  student.fileName = e.target.files[0].name
  let reader = new FileReader();
       reader.onload = (e: any) => {
        student.pdfSrc = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      console.log("next",reader.readAsDataURL(e.target.files[0]))
}
checkPdf(student:any , index:any){
  this.authService.getAssignments(student.rollNumber,this.SelectedSubject[index] ).subscribe((res:any)=>{
    if(res.body.length){
      this.toaster.warning(`Already Assigned Assignment in ${this.SelectedSubject[index]}`, "Warning")
    }
  })
}
upload(student: any, index:any){
  if(this.SelectedSubject[index]){
    if(student.pdfSrc != ''){
      let data = {
        userName : student.userName,
        rollNumber: student.rollNumber,
        subject: this.SelectedSubject[index],
        pdfData: student.pdfSrc,
        userId: student.userId
      }
      console.log(data)
      this.authService.addAssignments(data).subscribe((res:any)=>{
        console.log(res)
        if(res.message == "Success"){
          this.toaster.success("Upload successfully", res.message)
        }
      })
    }else{
      this.toaster.warning("Please select PDF file", "Warning")
    }
  }else{
    this.toaster.warning("Please select subject", "Warning")  }
}
// download(student:any){
//   console.log(student.rollNumber)
//   this.authService.getAssignments(student.rollNumber).subscribe((res:any)=>{
//     console.log(res,"response")
//      if(res.message=="Success"){
//     //  let dataView = new DataView(res.body.pdfData);
//     //   const x = new Blob([dataView], { type: 'application/pdf' });
//     //   var a = document.createElement('a'); 
//     //   a.href = URL.createObjectURL(x);
//     //   a.setAttribute('download', 'geoip.pdf');
//     //   a.click();
//          const downloadLink = document.createElement("a");
//          const fileName = "abc.pdf";
//          downloadLink.href = res.body[0].pdfData;
//          downloadLink.download = fileName;
//          downloadLink.click();
//       }
//   })
//  }
}


