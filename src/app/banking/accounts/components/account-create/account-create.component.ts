import { ResponseType } from 'src/app/shared/events/response-type/response-type.component';
import { AccountData, CreateAccountStatus } from '../../models/account.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {
  formgroup: any;
  accountData: AccountData;
  submitted = false;
  createAccountStatus: CreateAccountStatus;
  responseStatus = '';

  addAccountRequest: AccountData = {
    accountNumber: 0,
    accountName: '',
    balance: 0
  };

  constructor(private readonly service: AccountService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.formgroup = new FormGroup({
      "accountName": new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z 0-9]*')]),
      "balance": new FormControl(null, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1), Validators.max(1000000)])
    });

  }

  get accountName() { return this.formgroup.get('accountName') }
  get balance() { return this.formgroup.get('balance') }

  createAccount(): void {
    this.submitted = true;
    if (this.formgroup.valid) {
      this.service.createAccount(this.addAccountRequest)
        .subscribe({
          next: (data) => {
            this.createAccountStatus = data;

            if (this.createAccountStatus.returnValue == ResponseType.CREATE_ACCOUNT_COMPLITED) {
              this.router.navigate(['accounts']);
            }
            else {
              this.responseStatus = this.createAccountStatus.returnValue;
            }
          }
        });
    }
    else {
      this.formgroup.reset();
    }
  }
}
