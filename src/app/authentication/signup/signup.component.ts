import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import ValidateForm from 'src/app/banking/shared/formValidator';
import { RoleType } from '../login/role-type.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


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
      "firstName": new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z 0-9]*')]),
      "lastName": new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z 0-9]*')]),
      "userName": new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z 0-9]*')]),
      "password": new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z 0-9]*')]),
      "token": new FormControl(''),
      "role": new FormControl(RoleType.APP_USER),
      "email": new FormControl('', [Validators.email, Validators.required]),
    });
  }

  hideShowPsw(): void {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  get firstName() { return this.formgroup.get('firstName') }
  get lastName() { return this.formgroup.get('lastName') }
  get email() { return this.formgroup.get('email') }
  get userName() { return this.formgroup.get('userName') }
  get password() { return this.formgroup.get('password') }


  onSingup(): void {
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
