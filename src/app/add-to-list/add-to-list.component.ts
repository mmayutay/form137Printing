import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router'
import Swal from 'sweetalert2'
import readyToPassForm from '../images/readyToPassForm.json' 
import formForStudents from '../images/formForStudents.json'
import { DataRequestService } from '../data-request.service'

@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.css']
})
export class AddToListComponent implements OnInit {
  public studentsAuthentication = {name: "", auth: false}
  public hide = false;
  public imagesQuantity;
  public fileName = []
  public url = []
  public newValue = formForStudents
  public toPassForm = readyToPassForm
  public studentsData = []
  public allStudents
  public allStudentsInfo = []
  public forTheCurrentUser = []
  public userID = ""
  public hideAdd  = false

  constructor(
    private router: Router,
    private http: DataRequestService,
    private activeRoute:  ActivatedRoute
    ) { }

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

  add() {
    if (this.newValue.FirstName == " " || this.newValue.MiddleName == " " || this.newValue.LastName == "") {
      Swal.fire(
        "Warning",
        "Names are blank",
        "warning"
      )
    }else if (this.fileName.length == 0) {
      Swal.fire(
        "Warning",
        "Images are required",
        "warning"
      )
    }else if (this.newValue.Adviser == "") {
      Swal.fire(
        "Warning",
        "Field Adviser is required"
      )
    }else if (this.newValue.Section == "") {
      Swal.fire(
        "Warning",
        "Field Section is required",
        "warning"
      )
    }else if (this.newValue.SchoolYear == "") {
      Swal.fire(
        "Warning",
        "Field School Year is required",
        "warning"
      )
    }else {
      this.toPassForm.images = this.fileName
      this.toPassForm.name = this.newValue.FirstName + " " + this.newValue.MiddleName + " " + this.newValue.LastName
      this.toPassForm.adviser = this.newValue.Adviser
      this.toPassForm.section = this.newValue.Section
      this.toPassForm.schoolYear = this.newValue.SchoolYear
      this.http.addStudents(this.toPassForm).subscribe((value) => {
        if(value) {
          Swal.fire(
            this.toPassForm.name + ' is added!',
            this.newValue.FirstName + ' is successfully added to the database!',
            'success'
          ).then(() => {
            location.reload()
          })
          this.newValue = ""
          this.imagesQuantity = 0
          this.url = []
        }
      })
    }
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
  fileUpload(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.fileName.push(event.target.files[0].name)
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url.push(event.target.result);

      }
    }
  }
  counter(i : number) {
    return new Array(i)
  }
  showIdentifier(value){
    this.hide = value
  }

  reRouteClick(route){
    this.router.navigate(['/'+route])
  }


}
