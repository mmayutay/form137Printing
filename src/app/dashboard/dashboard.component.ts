import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataRequestService } from '../data-request.service'
import Swal from 'sweetalert2';
import * as printJS from 'print-js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public disableShow = false
  public forTheCurrentUser = []
  public hideAdd = false
  public userID = ""
  public studentsAuthentication = { name: "", auth: false }
  public allStudentsInfo = []
  public hide = false;
  public printableForms = []
  public json;
  public userArray = [];
  public studentsName = "";
  public allStudents;
  public showSuggestedStudents = []

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

  onKey(value) {
    this.studentsName = value.target.value.toLowerCase()
  }

  

  showUserInfo() {
    
    Swal.fire({
      title: this.studentsAuthentication.name,
      text: "Do you want to edit your about info?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/view-user/' + this.studentsAuthentication.name + '/'+ this.studentsAuthentication.auth  + '/' + this.userID])
      }
    })
  }

  showValue() {
    if (this.studentsName != "") {
      this.disableShow = true
      let counter = 0
      this.userArray = []
      this.allStudents.forEach(element => {
        if (element.images.length != 0) {
          if (element.name.toLowerCase().includes(this.studentsName)) {
            counter += 1
            this.userArray.push(element)
            this.allStudentsInfo = this.userArray
          }
        }
      });
      if (counter == 0) {
        Swal.fire(
          "Oops..",
          "No record found",
          "error"
        )
      }
    }else {
      Swal.fire (
        "Hey!",
        "You must enter a key to search!",
        "warning"      
      )
    }
    this.studentsName = ""
  }

  showUserDetails(values) {
    Swal.fire({
      title: 'You want to print?',
      text: 'You have ' + values.images.length + " document/s, print docu's?",
      icon: 'question',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
      showCloseButton: true
    }).then((bool) => {
      if (bool.value) {
        for (let index = 0; index < values.images.length; index++) {
          this.printableForms.push('http://localhost:8887/' + values.images[index])
        }
        printJS({
          printable: this.printableForms,
          type: 'image',
          imageStyle: 'width:93%;'
        })
      }
      this.printableForms = []
    })
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
  showAllStudents() {
    this.disableShow = false
    this.showSuggestedStudents = []
    this.http.getStudents().subscribe((studentsInfo) => {
      this.json = studentsInfo
      this.json.forEach(element => {
        if (element.images.length != 0) {
          this.showSuggestedStudents.push(element)
        }
      })
      this.allStudentsInfo = this.showSuggestedStudents
    })
    this.studentsName = ""
  }
  editStudentsData() {
    Swal.fire({
      icon: "warning",
      title: "What are you want to edit?",
      input: 'text',
      preConfirm: (inputed) => {
        console.log(inputed)
      }
    })
  }
  showIdentifier(value) {
    this.hide = value
  }
  onChange($event) {
    let text = $event.target.options[$event.target.options.selectedIndex].text;
    this.studentsName = text
  }
  reRouteClick(route) {
    this.router.navigate(['/' + route])
  }
  editStudentsInfo(student) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to update  " + student.name + "'s record?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Edit it!'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/edit-user/' + this.studentsAuthentication.name + '/'+ this.studentsAuthentication.auth  + '/'  + student._id])
      }
    })

  }
  deleteStudentsInfo(student, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete  " + student.name + "'s record?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.http.deleteStudentsInfo(student).subscribe((res) => {
          if (res) {
            this.allStudentsInfo.splice(index, 1)
            Swal.fire(
              'Deleted!',
              student.name + ' was deleted successfully!',
              'success'
            ).then(() => {
              // location.reload()
            })
          }
        })
      }
    })
  }

}
