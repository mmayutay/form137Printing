import { Component, OnInit } from '@angular/core';
import { DataRequestService } from '../data-request.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import formForStudents from '../images/formForStudents.json'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {
  public currentUser = ""
  public studentIdentifier = ""
  public url = []
  public imageAdd = false
  public toggle = false
  public studentsData = formForStudents
  public dataToPush = formForStudents
  public userArray = []

  constructor(
    private http: DataRequestService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params.id
    this.currentUser = this.activeRoute.snapshot.params.name
    this.studentIdentifier = id
    this.http.getOneStudent(id).subscribe((data) => {
      this.studentsData = data
      this.studentsData.forEach(element => {
        this.userArray.push(element)
        this.http.deleteStudentsInfo(this.studentsData[0]).subscribe((data) => {
          console.log(data)
        })
      });
    })
    console.log(this.currentUser)
  }
  imagePreview(img) {
    Swal.fire({
      imageUrl: 'http://localhost:8887/' + img,
      imageHeight: 500,
      imageAlt: 'A tall image'
    })
  }
  deleteImage(i) {
    this.userArray[0].images.splice(i, 1)
  }

  showAllImages() {
    if (this.toggle) {
      this.toggle = false
    } else {
      this.toggle = true
    }
  }
  addAnother() {
    this.imageAdd = true
  }
  fileUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.userArray[0].images.push(event.target.files[0].name)
    }
  }

  submit() {
    if (this.userArray[0].name == "") {
      Swal.fire(
        'Warning',
        'Name field is blank',
        'warning'
      )
    } else if (this.userArray[0].adviser == "") {
      Swal.fire(
        'Warning',
        'Adviser field is blank',
        'warning'
      )
    } else if (this.userArray[0].section == "") {
      Swal.fire(
        'Warning',
        'Section field is blank',
        'warning'
      )
    } else if (this.userArray[0].schoolYear == "") {
      Swal.fire(
        'Warning',
        'Name field is blank',
        'warning'
      )
    } else {
      this.dataToPush.name = this.userArray[0].name
      this.dataToPush.adviser = this.userArray[0].adviser
      this.dataToPush.section = this.userArray[0].section
      this.dataToPush.schoolYear = this.userArray[0].schoolYear
      this.dataToPush.images = this.userArray[0].images
      this.http.addStudents(this.dataToPush).subscribe((bool) => {
        Swal.fire(
          'Good job!',
          this.userArray[0].name + ' information edited sucessfully',
          'success').then(() => {
            this.router.navigate(['/dashboard/' + this.currentUser + '/true'])
          })
      })
    }
  }
}
