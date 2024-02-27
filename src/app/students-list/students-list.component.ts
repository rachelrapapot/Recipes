import { Component, OnInit } from '@angular/core';
import Student from '../student.model';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  public studentList: Student[] = [{ name: 'chana', id: '123456789' }]
  constructor() { }

  ngOnInit(): void {
  }

  public delete(student: Student) {
    let index = this.studentList.indexOf(student)
    this.studentList.splice(index, 1)
  }
}
