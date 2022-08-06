import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup 
  storedDate:any
  title = 'practice-ui';
  constructor(private authService:AuthService, private toaster: ToastrService, private router:Router, private fb: FormBuilder, private sharedData: SharedService){
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      phoneNumber:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]  ,
      lastName: ['', Validators.required]
    })
    if(this.sharedData.getData().length){
      this.storedDate = this.sharedData.getData()
     
      this.signUpForm.controls['firstName'].patchValue(this.storedDate[0].firstName)
       this.signUpForm.controls['email'].patchValue(this.storedDate[0].email)
      this.signUpForm.controls['password'].patchValue(this.storedDate[0].password)
       this.signUpForm.controls['phoneNumber'].patchValue(this.storedDate[0].phoneNumber)
       this.signUpForm.controls['lastName'].patchValue(this.storedDate[0].lastName)
    }
  }
  ngOnInit(){
  }
  phoneKeyUp(e:any){
	 	const keyCode = e.keyCode;  
		if (( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode !=8) {
			e.preventDefault();
		} 	  
}
  submit(){
    let data = {
      firstName : this.signUpForm.value.firstName,
      lastName :this.signUpForm.value.lastName,
      email : this.signUpForm.value.email,
      phoneNumber : parseInt(this.signUpForm.value.phoneNumber),
      password : this.signUpForm.value.password
    }
    this.sharedData.addData(this.signUpForm.value);
    this.authService.sendData(data).subscribe(res=>{
      if(res){
        this.router.navigate(['login']);
        this.toaster.success("Account Added Successfully" , "Success")
      }
    })
    
  }

}
