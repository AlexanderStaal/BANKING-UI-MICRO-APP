import { TransfersService } from '../../services/transfers.service';
import { TransactionsData } from '../../models/transfers.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transfer-funds-history',
  templateUrl: './transfer-funds-history.component.html',
  styleUrls: ['./transfer-funds-history.component.scss']
})

export class TransferFundsHistoryComponent implements OnInit {
  formgroup: FormGroup;
  selectedOption;
  openDialog: boolean;
  displayedColumns = ['transactionId', 'fromAccountNumber', 'toAccountNumber', 'transactionTime', 'amountDebit', 'fromAccountBalance', 'toAccountBalance', 'action'];
  transactionDetailsColumns = ['transactionId', 'fromAccountNumber', 'toAccountNumber', 'transactionTime', 'amountDebit', 'fromAccountBalance', 'toAccountBalance'];

  dataSource: MatTableDataSource<TransactionsData>;
  dataSourceTransaction;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private readonly service: TransfersService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.BindData();
  }

  BindData(): void {
    this.router.paramMap.subscribe({
      next: (param) => {
        this.service.getAllTransactions()
          .subscribe(t => {
            this.dataSource = new MatTableDataSource(t);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });

      }
    })
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  show(transactionsData: TransactionsData): void {
    this.openDialog = true;
    this.dataSourceTransaction = TransactionsData[0] = [];
    this.dataSourceTransaction.unshift(transactionsData);
  }
}
