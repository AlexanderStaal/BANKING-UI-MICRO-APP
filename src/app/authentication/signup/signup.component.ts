import { Router } from '@angular/router';
import ValidateForm from 'src/app/banking/shared/formValidator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { RoleType } from '../login/role-type.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  formgroup: any;

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
      "role": new FormControl(RoleType.APP_USER),
      "email": new FormControl(''),
    });
  }

  hideShowPsw(): void {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  // get firstName() { return this.formgroup.get('firstName') }
  // get lastName() { return this.formgroup.get('lastName') }
  // get email() { return this.formgroup.get('email') }
  // get userName() { return this.formgroup.get('userName') }
  // get password() { return this.formgroup.get('password') }


  onSingup(): void {
    debugger;

    if (this.formgroup.valid) {
      this.service.signUp(this.formgroup.value)
        .subscribe({
          next: (res) => {
            alert(res.message);
            this.formgroup.reset();
            this.router.navigate(['login']);
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

}
