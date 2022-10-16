import { TransferSource, TransactionsData, TransferFundsData, TransferFundsStatus } from '../models/transfers.model';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransfersService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  baseUrl: string = '';

  constructor(private readonly http: HttpClient) {
    this.baseUrl = `${environment.bankingUri}Transactions/`;
  }

  

  public getTransferSources(): Observable<TransferSource[]> {
    return this.http.get<TransferSource[]>(this.baseUrl + 'GetTransferSource').pipe(
      catchError(err => {
        return throwError(() => {
          return new Error(`Could not load transfer sources`);
        })
      })
    )
  }

  public getAllTransactions(): Observable<TransactionsData[]> {
    return this.http.get<TransactionsData[]>(this.baseUrl + 'GetAllTransactions').pipe(
      catchError(err => {
        return throwError(() => {
          return new Error(`Could not load transaction`);
        })
      })
    )
  }

  public transferFunds(transferFundsRequest: TransferFundsData): Observable<TransferFundsStatus> {
    var result = this.http.post<TransferFundsStatus>(this.baseUrl + 'TransferFunds', transferFundsRequest)
    .pipe(
      catchError(err => {
        return throwError(() => {
          return new Error(`Could not load transfer sources`);
        })
      })
    )
    return result;
  }
}
