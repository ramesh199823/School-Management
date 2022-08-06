import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "*",
      
    } )
  };
  constructor(private http:HttpClient){}
sendData(data:any){
    return this.http.post('http://localhost:3000/signUp',data)
 }
 getData(data:any){
   return this.http.post('http://localhost:3000/login',data)
 }
 addStudentDetails(data:any){
   return this.http.post('http://localhost:3000/addStudent', data)
 }
 getStudentDetails(id:any, limit?:any, skip?:any, searchFilter?:any){
    return this.http.get('http://localhost:3000/getStudents' + '?userId=' +id + '&limit=' +limit + '&skip=' +skip + '&filter=' + searchFilter)
 }
 getAllStudentDetails(id:any){
  return this.http.get('http://localhost:3000/getAllStudents' + '?userId=' +id)
 }
 studentCount(id:any){
  return this.http.get('http://localhost:3000/getStudentsCount' + '?userId=' +id)
 }
 deleteStudent(id:any){
   return this.http.delete('http://localhost:3000/deleteStudent' + '?_id=' +id)
 }
 updateStudentDetails(data:any, id:any ){
   return this.http.put('http://localhost:3000/updateStudent'+ '?_id=' +id  ,data)
 }
 addAttendanceDetails(data:any) {
   return this.http.put('http://localhost:3000/addAttendanceDetails', data)
}
addNewAttendanceDetails(data:any){
  return this.http.put('http://localhost:3000/addNewAttendanceDetails', data)
}
getAttendance(id:any){
  return this.http.get('http://localhost:3000/getAttendance' + '?userId=' +id)
}
updateUser(data:any, id:any){
  return this.http.put('http://localhost:3000/updateUser'+ '?_id=' +id , data )
}
todayAttendanceDetails(id: any, date:any){
  return this.http.get('http://localhost:3000/todayAttendanceDetails' + '?userId=' +id + '&date=' + date)
}
deleteStudentAttendace(rollNumber: any){
   return this.http.delete('http://localhost:3000/deleteStudentAttendace' + '?rollNumber=' + rollNumber)
}
updateAttendanceDetails(data:any, rollNumber:any){
  return this.http.put('http://localhost:3000/updateAttendanceDetails' + '?rollNumber=' + rollNumber, data)
}
generateOtp(data:any){
  return this.http.post('http://localhost:3000/generateOtp', data)
}
otpVerify(email:any, otp:any){
  return this.http.get('http://localhost:3000/otpVerify'+ '?email=' + email + '&otp=' +otp  )
}
newPassword(data: any){
  return this.http.put('http://localhost:3000/newPassword', data)
}
addAssignments(data:any){
  return this.http.post('http://localhost:3000/addAssignments',data)
}
getAssignments(rollNumber:any, subject:any){
  return this.http.get('http://localhost:3000/getAssignments'+ '?rollNumber=' + rollNumber +'&subject=' + subject)
}
getAssignmentBySubject(subject:any, id:any){
  return this.http.get('http://localhost:3000/getAssignmentBySubject'+ '?subject=' +subject + '&userId=' + id)
}
}
