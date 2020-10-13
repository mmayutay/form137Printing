import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import { DataRequestService } from '../data-request.service'

@Component({
  selector: 'app-view-user-info',
  templateUrl: './view-user-info.component.html',
  styleUrls: ['./view-user-info.component.css']
})
export class ViewUserInfoComponent implements OnInit {
  public showPass = "password"
  public currentUser = ""
  public userId = ""
  public data;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private http: DataRequestService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.activeRoute.snapshot.params.name
    this.userId = this.activeRoute.snapshot.params.id
    this.http.getOneStudent(this.userId).subscribe((data) => {
      this.data = data[0]
    })
  }
  submitData() {
    this.http.addAnotherUser(this.data).subscribe((bool) => {
      if(bool) {
        this.http.deleteStudentsInfo({name: this.currentUser, _id: this.userId}).subscribe((data) => {
          Swal.fire(
            "Good Job!",
            "You've successfully edited your User Info!",
            "success"
          ).then(() => {
            this.router.navigate(['/log-in'])
          })
        })
      }
    })
  }
  backToDashboard() {
    this.router.navigate(['/dashboard/' + this.currentUser + '/' + true])
  }

  showPasswordClick() {
    if (this.showPass == "text") {
      this.showPass = "password"
    } else {
      this.showPass = "text"
    }
  }

}
