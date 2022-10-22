
import { ResponseType } from 'src/app/shared/events/response-type/response-type.component';
import { TransferFundsData, TransferFundsStatus } from './../../models/transfers.model';
import { DialogService } from 'src/app/shared/dialog/services/dialog.service';
import { AccountService } from './../../../accounts/services/account.service';
import { TransfersService } from './../../services/transfers.service';
import { AccountData } from '../../../accounts/models/account.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute, Router } from '@angular/router';
import { NglComboboxOptionItem } from 'ng-lightning';
import { Component, OnInit } from '@angular/core';

enum PropertyType {
  fromAccount = 'From Account',
  toAccount = 'To Account'
}

@Component({
  selector: 'app-transferfunds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.scss']
})

export class TransferFundsComponent implements OnInit {
  formgroup: any;
  submitted = false;
  openDialog: boolean;
  onSuccess: Boolean;

  fromAccountOptions: NglComboboxOptionItem[];
  fromAccountComboboxOpen: any;
  fromAccountSelection;
  fromAccount: any;

  toAccountOptions: NglComboboxOptionItem[];
  toAccountComboboxOpen: any;
  toAccountSelection;
  toAccount: any;

  transferFundsStatus: TransferFundsStatus;
  responseStatus;
  fromAccountMsg;
  toAccountMsg;
  errorMessage;
  dataSource: MatTableDataSource<AccountData>;
  fromAccountDetailsData;
  toAccountDetailsData;
  accountDetailsColumns: string[] = ['accountNumber', 'accountName', 'balance'];

  transferFundsRequest: TransferFundsData = {
    fromAccountNumber: 0,
    toAccountNumber: 0,
    amount: ''
  };

  constructor(private readonly service: TransfersService,
    private readonly accoutService: AccountService,
    private activeRouter: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.formgroup = new FormGroup({
      "fromAccount": new FormControl(PropertyType.fromAccount),
      "toAccount": new FormControl(PropertyType.toAccount),
      "amount": new FormControl(null, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1), Validators.max(10000)])
    });

    this.loadTransferSources();
    this.fromAccountSelection = PropertyType.toAccount;
    this.toAccountSelection = PropertyType.toAccount;
  }

  get fromAccountSource() { return this.formgroup.get('fromAccountSource'); }
  get toAccountSource() { return this.formgroup.get('toAccountSource'); }
  get amount() { return this.formgroup.get('amount'); }

  loadTransferSources(): void {

    debugger;

    this.service.getTransferSources().subscribe((res: any) => {
      let fromOptionsData: NglComboboxOptionItem[] = res;

      for (let i = 0; i < res; i++) {
        fromOptionsData.push({ value: res[i].value, label: res[i].text });
      }

      this.fromAccountOptions = fromOptionsData;
      this.toAccountOptions = fromOptionsData;

    },
      error => {
        this.errorMessage = 'Please setup some accounts';
      });
  }

  onFromAccountSeleted(): void {
    let fromAccount = this.formgroup.get("fromAccount").value;
    this.toAccountOptions = this.toAccountOptions.filter(a => a.value != fromAccount);
    this.bindData(fromAccount, PropertyType.fromAccount);
    this.fromAccountMsg = "";
  }

  onToAccountSeleted(): void {
    let toAccount = this.formgroup.get("toAccount").value;
    this.bindData(toAccount, PropertyType.toAccount);
    this.toAccountMsg = "";
  }

  
  bindData(accountNumber: number, accountType: PropertyType): void {
    debugger;
    this.activeRouter.paramMap.subscribe({
      next: (param) => {
        this.accoutService.getAccount(accountNumber)
          .subscribe({
            next: (response) => {
              if (accountType == PropertyType.fromAccount) {
                this.fromAccountDetailsData = AccountData[0] = [];
                this.fromAccountDetailsData.unshift(response);
              }
              else {
                this.toAccountDetailsData = AccountData[0] = [];
                this.toAccountDetailsData.unshift(response);
              }
            }
          });
      }
    });
  }

  transferFunds(): void {
    const myCompDialog = this.dialogService.confirmDialog({
      title: 'Are you sure you want to transfer funds?',
      message: '',
      confirmText: 'Yes',
      cancelText: 'No'
    });

    myCompDialog.subscribe((res) => {
      if (res) {
        this.initiatedTransfer();
      }
    });

  }
  initiatedTransfer(): void {
    debugger;

    let isSubmit: Boolean = true;

    if (isNaN(this.formgroup.controls['fromAccount'].value) || this.formgroup.controls['fromAccount'].value == PropertyType.fromAccount) {
      this.fromAccountMsg = ResponseType.SELECT_FROM_ACCOUNT;
      isSubmit = false;
    }

    if (isNaN(this.formgroup.controls['toAccount'].value) || this.formgroup.controls['toAccount'].value == PropertyType.toAccount) {
      this.toAccountMsg = ResponseType.SELECT_TO_ACCOUNT;
      isSubmit = false;
    }

    if (isNaN(this.formgroup.controls['amount'].value)) {
      this.toAccountMsg = ResponseType.TRANSFER_AMOUNT_REQUIRED;
      isSubmit = false;
    }
    else {
      this.formgroup.controls['amount'].value = Number(this.formgroup.controls['amount'].value);
    }

      this.transferFundsRequest = {
      fromAccountNumber: Number(this.formgroup.controls['fromAccount'].value),
      toAccountNumber: Number(this.formgroup.controls['toAccount'].value),
      amount: this.formgroup.controls['amount'].value
    };

    if (isSubmit) {
      debugger;
      this.service.transferFunds(this.transferFundsRequest)
        .subscribe({
          next: (data) => {
            this.transferFundsStatus = data;

            if (this.transferFundsStatus.transferFundsStatus.toUpperCase() == ResponseType.TRANSFER_COMPLITED) {
              this.router.navigate(['transferFundsHistory']);
            }
            else {
              this.responseStatus = this.transferFundsStatus.transferFundsStatus;
            }
          }
        });
    }
  }
}