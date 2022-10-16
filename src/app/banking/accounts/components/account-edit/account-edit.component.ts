import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/shared/dialog/services/dialog.service';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountData } from '../../models/account.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})

export class AccountEditComponent implements OnInit {
  submitted = false;
  formgroup: any;

  updateAccountRequest: AccountData = {
    accountNumber: 0,
    accountName: '',
    balance: 0
  };

  constructor(private readonly service: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.formgroup = new FormGroup({
      "accountName": new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z 0-9]*')]),
      "balance": new FormControl(null, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1), Validators.max(10000)])
    });

    this.loadData();
  }

  get accountName() { return this.formgroup.get('accountName'); }
  get balance() { return this.formgroup.get('balance'); }

  loadData(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        const accountNumber = param.get('accountNumber');
        if (accountNumber) {
          var acct_cd = parseInt(accountNumber);
          this.service.getAccount(acct_cd)
            .subscribe({
              next: (response) => {
                response.accountName = response.accountName.trim()
                this.updateAccountRequest = response;
              }
            });
        }
      }
    })
  }

  saveAccount(): void {
    const myCompDialog = this.dialogService.confirmDialog({
      title: 'Are you sure you want to edit this account?',
      message: '',
      confirmText: 'Yes',
      cancelText: 'No'
    });

    myCompDialog.subscribe((res) => {
      if (res) {
        this.submitted = true;
        if (this.formgroup.valid) {
          this.service.updateAccount(this.updateAccountRequest)
            .subscribe({
              next: (data) => {
                this.router.navigate(['accounts']);
              }
            });
        }
        else {
          this.formgroup.reset();
        }
      }
    });
  }
}
