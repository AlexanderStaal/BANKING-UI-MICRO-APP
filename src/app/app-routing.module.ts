import { AuthGuard } from './authentication/guard/auth.guard';
import { MainComponent } from './main/main.component';
import { TransferFundsHistoryComponent } from './banking/transfers/components/transfer-funds-history/transfer-funds-history.component';
import { TransferFundsComponent } from './banking/transfers/components/transfer-funds/transfer-funds.component';
import { AccountCreateComponent } from './banking/accounts/components/account-create/account-create.component';
import { AccountDeleteComponent } from './banking/accounts/components/account-delete/account-delete.component';
import { AccountsListComponent } from './banking/accounts/components/accounts-list/accounts-list.component';
import { AccountEditComponent } from './banking/accounts/components/account-edit/account-edit.component';
import { StartupComponent } from './authentication/startup/startup.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { BankingComponent } from './banking/banking.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './authentication/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoleGuard } from './authentication/guard/role.guard';
import { LogoutComponent } from './authentication/logout/logout.component';

const routes: Routes = [
  {
    path: "accountDelete/:accountNumber", component: AccountDeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "transferFundsHistory", component: TransferFundsHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "accountEdit/:accountNumber", component: AccountEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "transferFunds", component: TransferFundsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "accountCreate", component: AccountCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "accounts", component: AccountsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "feedback", component: FeedbackComponent
  },
  {
    path: "startup", component: StartupComponent,
    canActivate: [RoleGuard]
  },
  {
    path: "signup", component: SignupComponent,
  },
  {
    path: "logout", component: LogoutComponent,
  },
  {
    path: "admin", component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "home", component: BankingComponent,
    canActivate: [AuthGuard]
  },

  { path: "login", component: LoginComponent },
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
