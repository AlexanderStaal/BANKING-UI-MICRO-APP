
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
  selector: 'app-transferfund',
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
  toAccountOptions: NglComboboxOptionItem[];
  toAccountComboboxOpen: any;
  toAccountSelection;
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
    amount: 0
  };

  constructor(private readonly service: TransfersService,
    private readonly accoutService: AccountService,
    private activeRouter: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.formgroup = new FormGroup({
      "fromAccountSource": new FormControl(PropertyType.toAccount),
      "toAccountSource": new FormControl(PropertyType.toAccount),
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
    this.transferFundsRequest = {
      fromAccountNumber: parseInt(this.fromAccountSelection),
      toAccountNumber: parseInt(this.toAccountSelection),
      amount: this.transferFundsRequest.amount
    };

    this.service.getTransferSources().subscribe((res: any) => {
      let fromOptionsData: NglComboboxOptionItem[] = res;

      for (let i = 0; i < res; i++) {
        fromOptionsData.push({ value: res[i].value, label: res[i].text });
      }

      var fromPickListVal = { "attributes": null, "label": "-- Select From Account --", "validFor": [], "value": "-- Select From Account --" };
      this.fromAccountOptions = fromOptionsData;
      this.fromAccountOptions.unshift(fromPickListVal)

      var toPickListVal = { "attributes": null, "label": "-- Select To Account --", "validFor": [], "value": "-- Select To Account --" };
      this.toAccountOptions = fromOptionsData;
      this.toAccountOptions.unshift(toPickListVal)

      this.fromAccountOptions = this.fromAccountOptions.filter(a => a.value != "-- Select From Account --");
      this.toAccountOptions = this.toAccountOptions.filter(a => a.value != "-- Select To Account --");
    },
      error => {
        this.errorMessage = 'Please set up some accounts';
      });
  }

  onFromAccountSeleted(selectedAccountNumber: any): void {
    this.toAccountOptions = this.toAccountOptions.filter(a => a.value != selectedAccountNumber);
    this.bindData(selectedAccountNumber, PropertyType.fromAccount);
  }

  onToAccountSeleted(selectedAccountNumber: any): void {
    this.bindData(selectedAccountNumber, PropertyType.toAccount);
  }

  bindData(accountNumber: number, accountType: PropertyType): void {
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

  getCategory(event) {
    let params = {
      'value': event,
      'lable': ''
    }
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
    let isSubmit: Boolean = true;
    this.transferFundsRequest = {
      fromAccountNumber: parseInt(this.fromAccountSelection),
      toAccountNumber: parseInt(this.toAccountSelection),
      amount: this.transferFundsRequest.amount
    };

    if (isNaN(this.transferFundsRequest.fromAccountNumber)) {
      this.fromAccountMsg = ResponseType.SELECT_FROM_ACCOUNT
      isSubmit = false;
    }

    if (isNaN(this.transferFundsRequest.toAccountNumber)) {
      this.toAccountMsg = ResponseType.SELECT_TO_ACCOUNT
      isSubmit = false;
    }

    if (isSubmit) {
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