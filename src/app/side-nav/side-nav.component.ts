import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataRequestService } from '../data-request.service'
import { User } from './User';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  public hide = true;
  public userID = "";
  public studentsAuthentication: User = { name: "", auth: false };
  public hideAdd = false;
  public forTheCurrentUser = [];
  public allStudentsInfo = [];
  public allStudents;

  constructor(
    private router: Router,
    private http: DataRequestService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.http.getStudents().subscribe((studentsInfo) => {
      this.allStudents = studentsInfo
      this.allStudents.forEach(element => {
        if (element.images.length != 0) {
          this.allStudentsInfo.push(element)
        } else {
          if (this.studentsAuthentication.name == element.section) {
            this.forTheCurrentUser.push(element)
            this.userID = this.forTheCurrentUser[0]._id
            if (this.forTheCurrentUser[0].adviser == "admin") {
              this.hideAdd = true
            } else {
              this.hideAdd = false
            }
          }
        }
      });
    })
    let name = this.activeRoute.snapshot.params.name
    let auth = this.activeRoute.snapshot.params.auth
    this.studentsAuthentication.name = name
    this.studentsAuthentication.auth = auth
    this.http.authenticationVerify({ name: name, auth: auth }).subscribe(information => {
      if (!information) {
        this.router.navigate(['/log-in'])
      }
    })
  }

  showIdentifier(value) {
    this.hide = value
  }

  showUserInfo() {
    this.router.navigate(['/view-user/' + this.studentsAuthentication.name + '/' + this.studentsAuthentication.auth + '/' + this.userID])
  }

  reRouteClick(route) {
    this.router.navigate(['/' + route])
  }

  logOut() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You wan't to Log-out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log-out!'
    }).then((result) => {
      if (result.value) {
        this.http.authenticationVerify({ auth: 'false' }).subscribe(data => {
          this.router.navigate(['/log-in'])
        })
      }
    })
  }
}
