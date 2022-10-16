import ValidateForm from 'src/app/banking/shared/formValidator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
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


  constructor(private readonly formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.formgroup = new FormGroup({
      "firstName": new FormControl(''),
      "lastName": new FormControl(''),
      "userName": new FormControl(''),
      "password": new FormControl(''),
      "token": new FormControl(''),
      "role": new FormControl(''),
      "email": new FormControl(''),
    });
  }

  onLogin(){
  

    if (this.formgroup.valid) {
      console.log(this.formgroup.value);

      this.service.login(this.formgroup.value)
        .subscribe({
          next: (res) => {
            alert(res.message)
            //debugger;
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
