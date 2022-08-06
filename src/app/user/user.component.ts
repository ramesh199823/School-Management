import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  teacherDetails: any
  constructor() { }

  ngOnInit(): void {
    this.teacherDetails = JSON.parse(localStorage.getItem('user') || '{}' )
  }

}
