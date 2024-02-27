import { Component, Input, OnInit } from '@angular/core';
// import Student from '../student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  // @Input() student!: Student
  public firstName: string = 'פלוני'
  public lastName: string = 'אלמוני'
  constructor() { }

  ngOnInit(): void {
  }

  save() {
    console.log(this.firstName);
    console.log(this.lastName);
  }
}
