import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { AddStudetComponent } from './add-studet/add-studet.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { SharedService } from '../shared.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { StudentResolverService } from '../student-resolver.service';
import { AttendanceResolverService } from '../attendance-resolver.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentsDetailsComponent } from './assignments-details/assignments-details.component';
const routes:Routes =[
  {
   path: '',
   component: UserComponent, 
   children:[
     {
       path: 'home',
       component: HomeComponent
     },
     {
      path: '',
      component: HomeComponent
    },
     {
       path: 'addStudent',
       component : AddStudetComponent
     },
     {
      path: 'studentDetails',
      component : StudentDetailsComponent
    },
    {
      path: 'attendance',
      component : AttendanceComponent
    },
    {
      path: 'attendanceDetails',
      component : AttendanceDetailsComponent,
      resolve: {student : StudentResolverService}
    },
    {
    path: 'assignments',
    component: AssignmentsComponent
    },
    {
      path: 'assignmentsDetails',
      component: AssignmentsDetailsComponent
      },
    {
      path: 'editProfile',
      component : EditProfileComponent
    }
  ]
  }
]

@NgModule({
  declarations: [
    UserComponent,HeaderComponent, SideBarComponent,HomeComponent , StudentDetailsComponent, AddStudetComponent,
    AttendanceComponent, AttendanceDetailsComponent, EditProfileComponent, AssignmentsComponent, AssignmentsDetailsComponent
  ],
  imports: [
    CommonModule,FormsModule,NgSelectModule, NgbModule,MatSlideToggleModule, RouterModule.forChild(routes)
  ],
  providers: [AuthService, SharedService]
})
export class UserModule { }
