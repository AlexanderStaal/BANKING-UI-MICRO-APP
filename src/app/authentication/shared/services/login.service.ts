import { environment } from './../../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, InternalUser } from '../models/login.model';
import { catchError, of, throwError } from 'rxjs';
import { IUser } from '../../startup/iuser.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  baseUrl: string = '';

  constructor(private readonly http: HttpClient) {
    this.baseUrl = `${environment.bankingUri}User/`;
  }

  userData(userName: string): Observable<InternalUser> {
    return this.http.get<InternalUser>(this.baseUrl + userName).pipe(
      catchError(err => {
        return throwError(() => {
          return new Error(`Could not load user data`);
        })
      })
    )
  }

  getUser(user: IUser): IUser | never {
    this.userData(user.username).subscribe({
      next: (data) => {
        if (!data) {
          throw Error(`User not found`);
        }
      }
    });
    return user;
  }

  signUp(user: any) {
    return this.http.post<any>(`${this.baseUrl}RegisterUser`, user);
  }

  login(login: any) {
    return this.http.post<any>(`${this.baseUrl}Authenticate`, login);
  }

}
