import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userDetails: any;

  constructor(private authService:AuthService) { }
  firstName= '';
  lastName = '';
  email = '';
  phoneNumber = '';
  password = '';
  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user') || '{}')
    if(this.userDetails){
      this.firstName = this.userDetails.firstName
      this.lastName = this.userDetails.lastName
      this.email = this.userDetails.email
      this.phoneNumber = this.userDetails.phoneNumber       
      this.password = this.userDetails.password
    }
    
  }
  phoneKeyUp(e:any){
    const keyCode = e.keyCode;  
   if (( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode !=8) {
     e.preventDefault();
   } 	  
}
  updateUserDetails(){
   let data = {
    firstName:  this.firstName,
    lastName: this.lastName,
    email: this.email,
    phoneNumber: parseInt(this.phoneNumber),
    password: this.password,
    userId : parseFloat(this.userDetails.userId)
   }
   this.authService.updateUser(data, this.userDetails.userId).subscribe((res:any)=>{
     localStorage.setItem('user', JSON.stringify(res.body))
   })
  }
}
