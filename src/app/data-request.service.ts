import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataRequestService {
  public forImages = []
  public owner = ""

  constructor(private http: HttpClient) { }
  
  getStudents() {
    return this.http.get('http://localhost:3000/student')
  }
  getOneStudent(id) {
    return this.http.get('http://localhost:3000/studentToEdit/'+id)
  }
  addStudents(values) {
    return this.http.post('http://localhost:3000/studentInfo', values)
  }
  logIn(values) {
    return this.http.post('http://localhost:3000/login', values)
  }
  authenticationVerify(values) {
    return this.http.post('http://localhost:3000/verify', values)
  }
  deleteStudentsInfo(studentsName) {
    return this.http.post('http://localhost:3000/delete', studentsName)
  }
  addAnotherUser(newUser) {
    return this.http.post('http://localhost:3000/addUser', newUser)
  }
}
