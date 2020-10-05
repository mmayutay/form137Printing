import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataRequestService } from '../data-request.service'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  public showPass = "password" 
  public user = []
  public show = true
  public name = "";
  public password = "";

  constructor(private router: Router, private http: DataRequestService) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.name == "" || this.password == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The field/s are blank!'
      })
    } else {
      this.http.logIn({ name: this.name, password: this.password, auth: true }).subscribe((information) => {
        console.log(information)
        if (!information) {
          Swal.fire(
            "Oops..",
            "Maybe your username or password are invalid!",
            "error"
          )
        } else {
          this.user.push(information)
          if (this.user[0].auth) {
            this.router.navigate(['/dashboard/' + this.user[0].name + '/' + this.user[0].auth])
          }
        }
      })
    }
  }

  showPasswordClick(){
    if (this.showPass == "text") {
      this.showPass = "password"
    }else {
      this.showPass = "text"
    }
  }

}
