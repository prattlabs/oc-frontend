import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient) { }

  angForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  hide = true
  submitFailed = false

  get email(): any {
    return this.angForm.get('email');
  }
  get password(): any {
    return this.angForm.get('password');
  }

  getEmailErrorMessage() {
    if (this.angForm.get("email")!.hasError('required')) {
      return 'You must enter a value';
    }

    return this.angForm.get("email")!.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.angForm.get("password")!.hasError('required')) {
      return 'You must enter a value';
    }

    return this.angForm.get("password")!.hasError('password') ? 'Password was incorrect' : '';
  }

  Submit() {
    console.log("Submit");
    console.log(this.angForm.get("email"));
    console.log(this.angForm.get("password"));
    this.http
      .post('http://localhost:8080/login', {
        username: this.angForm.get("email")!.value,
        password: this.angForm.get("password")!.value,
        token: this.getToken(),
      }).subscribe({
        next: (response) => {
          console.log(response);
          this.submitFailed = false;
          window.location.href = "http://onecause.com/"
        },
        error: (error) => {
          console.log(error);
          this.submitFailed = true;
        },
      });
  }

  getToken(): number {
    const now = new Date();
    var strNow = "" + now.getHours() + "" + now.getMinutes()
    return +strNow;
  }

}
