import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import ValidateForm from 'src/app/banking/shared/formValidator';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  formgroup: FormGroup;

  get userName() { return this.formgroup.get('userName') }
  get password() { return this.formgroup.get('password') }

  constructor(private service: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.formgroup = new FormGroup({
      "firstName": new FormControl(''),
      "lastName": new FormControl(''),
      "userName": new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z 0-9]*')]),
      "password": new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z 0-9]*')]),
      "token": new FormControl(''),
      "role": new FormControl(''),
      "email": new FormControl(''),
    });
  }

  onLogin() {
    if (this.formgroup.valid) {
      console.log(this.formgroup.value);

      this.service.login(this.formgroup.value)
        .subscribe({
          next: (res) => {
            localStorage.setItem("userIsValid", "userIsValid");
            this.router.navigate(["home"]);
          },
          error: (err) => {
            alert(err?.error.message);
          }
        })
    }
    else {
      ValidateForm.validateAllFormFields(this.formgroup);
    }
  }

  hideShowPsw() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

}
