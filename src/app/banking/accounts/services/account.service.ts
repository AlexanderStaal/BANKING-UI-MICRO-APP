import { AccountData, CreateAccountStatus } from './../models/account.model';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl: string = '';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private readonly http: HttpClient) {
    this.baseUrl = `${environment.bankingUri}Account/`;
  }

  public getAllAccounts(): Observable<AccountData[]> {
    return this.http.get<AccountData[]>(this.baseUrl + 'GetAllAccounts').pipe(
      catchError(err => {
        return throwError(() => {
          return new Error(`Could not load account data`);
        })
      })
    )
  }

  public getAccount(accountNumber: number): Observable<AccountData> {
    return this.http.get<AccountData>(this.baseUrl + accountNumber)
    .pipe(
      catchError(err => {
        return throwError(() => {
          return new Error(`Could not load single account data`);
        })
      })
    )
  }

  public deleteAccount(accountNumber: number): Observable<AccountData> {
    return this.http.delete<AccountData>(this.baseUrl + accountNumber).pipe(
      catchError(err => {
        return throwError(() => {
          return new Error(`Could not delete account`);
        })
      })
    )
  };

  public createAccount(accountRequest: AccountData): Observable<CreateAccountStatus> {
    return this.http.post<CreateAccountStatus>(this.baseUrl + 'CreateAccount', accountRequest).pipe(
      catchError(err => {
        return throwError(() => {
          return new Error(`Could not create account`);
        })
      })
    )
  }

  public updateAccount(accountRequest: AccountData): Observable<AccountData> {
    return this.http.put<AccountData>(this.baseUrl + 'UpdateAccount', accountRequest)
    .pipe(
      catchError(err => {
        return throwError(() => {
          return new Error(`Could not update account data`);
        })
      })
    )
  }
}
