import { InternalUserData, LoginStatus } from '../shared/models/login.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { RoleType } from '../login/role-type.component';
import { NglComboboxOptionItem } from 'ng-lightning';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Roles {
  value: string;
}

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {
  error: Error | null = null;
  formgroup: any;
  submitted = false;
  responseStatus = '';
  selectedRole: string;
  roleName: string;
  userID: string;
  rolesOptions: NglComboboxOptionItem[];
  roleOpen: any;
  roleSelection;
  loginStatus: LoginStatus;
  userIdMsg;
  roleMsg;

  loginRequest: InternalUserData = {
    userName: '',
    role: ''
  };

  roles: Roles[] = [
    { value: RoleType.APP_ADMIN},
    { value: RoleType.APP_USER },
    { value: RoleType.APP_DEVELOPER }
  ];

  constructor(private readonly service: LoginService, private router: Router) { }

  ngOnInit() {
    this.formgroup = new FormGroup({
      "firstName": new FormControl(''),
      "lastName": new FormControl(''),
      "userName": new FormControl(''),
      "password": new FormControl(''),
      "token": new FormControl(''),
      "role": new FormControl(''),
      "email": new FormControl(''),
    });

    this.roleName = RoleType.APP_ADMIN
    this.loadRoles();
  }

  get userName() { return this.formgroup.get('userName') }

  loadRoles(): void {
    this.rolesOptions = this.roles;
  }

  selectRole(event) {
  }

  login(userName: string): void {
    this.responseStatus = 'User Id not found';
    try {
      let isSubmit: Boolean = true;
      if (isSubmit) {
        this.service.userData(this.formgroup.value.userName)
          .subscribe({
            next: (data) => {
                this.responseStatus = '';
                localStorage.setItem("role", "app-admin");
                localStorage.setItem("userIsValid", "userIsValid");
                this.router.navigate(["home"]);
            }
          });
      }
    } catch (error) {
        this.error = error;
        throw error;
    }
  }
}
