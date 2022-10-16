import { AccountService } from '../../services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { AppConfig } from 'src/app/app-config/app-config';
import { AccountData } from '../../models/account.model';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort'

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
  dataSource: MatTableDataSource<AccountData>;
  formgroup: FormGroup;
  openDialog: boolean;
  onSuccess: Boolean;
  accountDetails: AccountData;
  dataSourceAccountDetails;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  imgExcel;
  imgCSV;
  selectedOption;

  displayedColumns = ['accountName', 'balance', 'action'];
  exportHeader = [['accountNumber', 'accountName', 'balance']]
  accountDetailsColumns = ['accountNumber', 'accountName', 'balance'];

  constructor(private readonly service: AccountService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private appConfig: AppConfig,
  ) {
    this.accountDetails = new AccountData;
    this.imgExcel = appConfig.imgExcel;
    this.imgCSV = appConfig.imgCSV;
  }

  ngOnInit(): void {
    this.bindData()
    this.formgroup = this.formBuilder.group({
    });

    if (this.sort) {
      this.sort.disableClear = true;
    }
  }

  reset() {
    this.selectedOption = '0';
    document.getElementById('btn').onclick = () => {
      this.formgroup.get('btn').reset(null);
      this.formgroup.get('btn2').reset(null);
    }
  }

  bindData(): void {
    this.router.paramMap.subscribe({
      next: (param) => {
        this.service.getAllAccounts()
          .subscribe(t => {
            this.dataSource = new MatTableDataSource(t);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
      }
    })
  }

  calculatTotal() {
    if (this.dataSource !== undefined) {
      let tmp = new MatTableDataSource(this.dataSource.data.slice());
      return tmp.data.reduce((summ, v) => summ += v.balance, 0)
    } else {
      return null;
    }
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  show(accountData: AccountData): void {
    this.openDialog = true;
    this.dataSourceAccountDetails = AccountData[0] = [];
    this.dataSourceAccountDetails.unshift(accountData);
  }
}
