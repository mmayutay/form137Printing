import { Component, OnInit } from '@angular/core';
import { DataRequestService } from '../data-request.service'

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
  public allStudentsInfo = []
  public data;

  constructor(private http: DataRequestService) { }

  ngOnInit(): void {
    this.http.getStudents().subscribe((data) => {
      this.data = data
      this.data.forEach(element => {
        if(element.images.length == 0) {
          if(element.adviser != "admin"){
            this.allStudentsInfo.push(element)
          }
        }
      });
    })
  }

  deleteStudentsInfo(student, index) {
    this.http.deleteStudentsInfo(student).subscribe((data) => {
      this.allStudentsInfo.splice(index, 1)
    })
  }

}
