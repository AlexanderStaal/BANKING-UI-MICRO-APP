import { DialogService } from 'src/app/shared/dialog/services/dialog.service';
import { AccountService } from '../../services/account.service';
import { AccountData } from '../../models/account.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})

export class AccountDeleteComponent implements OnInit {
  //accountData: AccountData;
  formgroup: FormGroup;

  delAccountRequest: AccountData = {
    accountNumber: 0,
    accountName: '',
    balance: 0
  };

  constructor(private readonly service: AccountService,
    private formBuilder: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService) {
    //this.accountData = new AccountData();
  }

  ngOnInit(): void {
    this.bindData();

    this.formgroup = this.formBuilder.group({
      accountNumber: [''],
      accountName: [''],
      balance: ['']
    });

    this.formgroup.controls['accountNumber'].disable();
    this.formgroup.controls['accountName'].disable();
    this.formgroup.controls['balance'].disable();
  }

  bindData(): void {
    this.activeRouter.paramMap.subscribe({
      next: (param) => {
        const accountNumber = param.get('accountNumber');
        if (accountNumber) {
          var acct_cd = parseInt(accountNumber);
          this.service.getAccount(acct_cd)
            .subscribe({
              next: (response) => {
                this.delAccountRequest = response;
              }
            });
        }
      }
    })
  }

  deleteAccount(accountNumber: number): void {
    const myCompDialog = this.dialogService.confirmDialog({
      title: 'Are you sure you want to delete this account?',
      message: '',
      confirmText: 'Yes',
      cancelText: 'No'
    });

    myCompDialog.subscribe((res) => {
      if (res) {
        this.service.deleteAccount(accountNumber)
          .subscribe({
            next: (reponse) => {
              this.router.navigate(['accounts']);
            }
          });
      }
    });
  }
}

