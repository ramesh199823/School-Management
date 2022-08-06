import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInForm!: FormGroup;
  show = true
  constructor(private authService: AuthService,private router:Router, private toaster: ToastrService, private fb: FormBuilder) {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
   }
   first ="";
   second="";
  ngOnInit(): void {
  
  }
  eyeChange(){
    this.show = !this.show
  }
  submit(){
    let data = {
      email : this.logInForm.value.email,
      password : this.logInForm.value.password
    }
    this.authService.getData(data).subscribe((res:any)=>{
      if(res.message === 'Success'){
        console.log(res )
      localStorage.setItem('user', JSON.stringify(res.body))
      this.toaster.success("Login Successfully!",res.message)
      this.router.navigate(['user'])
      }else{
        this.toaster.error("Email or Password Incorrect",res.message )
      }
    })
  }
  //  result(){
  //    let a:any 
  //    let i =0, k =0, v = 0
  //    for(let j =0; j<this.second.length ;j++){
  //     a = this.first.indexOf(this.second[j])
  //     k = Math.abs( v - a)
  //     v = a
  //     i+= k
  //    }
  //  console.log(i)
  //  }
}
