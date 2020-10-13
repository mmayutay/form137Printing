import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataRequestService } from '../data-request.service';
import formForStudents from '../images/formForStudents.json'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public hideAdd = false
  public toBeSubmitted = {name: "", adviser: "", section: "", schoolYear: "", images: []}
  public addUser = formForStudents
  public confirmPassword = ""
  public studentsAuthentication = {name: "", auth: false}
  public allStudents;
  public allStudentsInfo = []
  public forTheCurrentUser  = []
  public userID = ""

  constructor(
    private router: Router,
    private http: DataRequestService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.getStudents().subscribe((studentsInfo) => {
      this.allStudents = studentsInfo
      this.allStudents.forEach(element => {
        if(element.images.length != 0) {
          this.allStudentsInfo.push(element)
        }else {
          if(this.studentsAuthentication.name == element.section) {
            this.forTheCurrentUser.push(element)
            this.userID = this.forTheCurrentUser[0]._id
            if (this.forTheCurrentUser[0].adviser == "admin") {
              this.hideAdd = true
            }else{
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
    this.http.authenticationVerify({name: name, auth: auth}).subscribe(information => {
      if(!information) {
        this.router.navigate(['/log-in'])
      }
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
        this.router.navigate(['/log-in'])
      }
    })
  }
  reRouteClick(route){
    this.router.navigate(['/'+route])
  }

  submitData() {
    if(this.addUser.SchoolYear == this.confirmPassword ) {
      this.toBeSubmitted.name = this.addUser.FirstName + " " + this.addUser.MiddleName + " " + this.addUser.LastName
      this.toBeSubmitted.section = this.addUser.Section
      this.toBeSubmitted.schoolYear = this.addUser.SchoolYear
      this.toBeSubmitted.adviser = ""
      console.log(this.toBeSubmitted)
      this.http.addAnotherUser(this.toBeSubmitted).subscribe(data => {
        Swal.fire(
          "Yes, Create!",
          this.addUser.FirstName + " added as a user succesfully!",
          "success"
        ).then((data)  => {
          this.router.navigate(['/dashboard/admin/true']);
        })
      })
    }
  }

}
