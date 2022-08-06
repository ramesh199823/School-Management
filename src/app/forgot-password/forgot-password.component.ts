import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  emailValidate:any = ''
  otpVerfication:any = ''
  show = "email";
  newPassword:any = ''
  confirmPassword:any = ''
  constructor(private toaster: ToastrService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  submit(){
    let data = {
      email : this.emailValidate
    }
    this.authService.generateOtp(data).subscribe((res:any)=>{
      console.log(res)
      if(res.message == 'success'){
        this.toaster.success("OTP sent your email id", res.message)
        this.show = "otp"
      }else{
        this.toaster.error('Email id is not valid', res.message)
      }
    })
  }
  verify(){
      this.authService.otpVerify(this.emailValidate, this.otpVerfication).subscribe((res:any)=>{
        console.log(res.message)
        if(res.message == 'Success'){
          this.toaster.success("Enter OTP is valid", res.message)
          this.show = "password"
        }else{
          this.toaster.error('Enter OTP is not valid', res.message)
        }
    })
  }
  newPass(){
    let data = {
      password : this.newPassword,
      email: this.emailValidate
    }
    this.authService.newPassword(data).subscribe((res:any)=>{
      if(res.message == 'Success'){
        this.toaster.success('New Password Updated Successfully', res.message)
        this.router.navigate(['login'])
      }else{
        this.toaster.error('Something went wrong', res.message)
      }
    })
  }
}
